import { v4 as uuid } from "uuid";
import { ContactInput, UpdateContactInput } from "../validators/contact.schema";
import { ContactListQueryInput } from "../validators/contact.schema";
import { PaginatedContacts, SerializedContact } from "../types/contact.types";
import { ConflictError, NotFoundError } from "../errors/custom-errors";
import { ContactRepositoryV2 } from "../repositories/contact.repository";
import { AuditLogRepository } from "../repositories/auditLog.repository";
import { ContactSerializer } from "../serializers/contact.serializer";
import { UserTokenPayload } from "../types/auth.types";

export class ContactServiceV2 {
  private repo = new ContactRepositoryV2();
  private auditRepo = new AuditLogRepository();

  // ─── List contacts with cursor pagination ────────────────────────────
  async getAllContacts(query: ContactListQueryInput, user: UserTokenPayload): Promise<PaginatedContacts> {
    const rows = await this.repo.findAll(query, user);

    // We fetched limit+1 rows to check if there's a next page
    const hasNextPage = rows.length > query.limit;
    const pageRows = hasNextPage ? rows.slice(0, query.limit) : rows;

    const nextCursor =  hasNextPage && pageRows.length > 0
        ? pageRows[pageRows.length - 1].id
        : null;

    return {
      data: ContactSerializer.serializeMany(pageRows),
      nextCursor,
      limit: query.limit,
    };
  }

  // ─── Get single contact ──────────────────────────────────────────────
  async getContactById(id: string, user: UserTokenPayload): Promise<SerializedContact> {
    const contact = await this.repo.findById(id);
    if (!contact) {
      throw new NotFoundError("The contact with the requested ID does not exist.");
    }
    
    // Ownership check: non-admin can only access own contacts
    if (user.role !== "admin" && contact.user_id !== user.userId) {
      throw new NotFoundError("The contact with the requested ID does not exist.");
    }

    return ContactSerializer.serialize(contact);
  }

  // ─── Create contact ──────────────────────────────────────────────────
  async createContact(data: ContactInput, user: UserTokenPayload): Promise<SerializedContact> {
    const existing = await this.repo.findByEmail(data.email);
    if (existing) {
      throw new ConflictError("A contact already exists with this email address.");
    }

    const id = uuid();
    const created = await this.repo.create(id, data, user.userId);
    return ContactSerializer.serialize(created);
  }

  
  // ─── Update contact (with audit log) ────────────────────────────────
  async updateContact(id: string, data: UpdateContactInput, user: UserTokenPayload): Promise<SerializedContact> {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new NotFoundError("The contact with the requested ID does not exist.");
    }

    // Ownership check
    if (user.role !== "admin" && existing.user_id !== user.userId) {
      throw new NotFoundError("The contact with the requested ID does not exist.");
    }

    if (data.email && data.email !== existing.email) {
      const emailTaken = await this.repo.findByEmail(data.email);
      if (emailTaken) {
        throw new ConflictError("A contact already exists with this email address.");
      }
    }

    const updated = await this.repo.update(id, data);
    if (!updated) {
      throw new NotFoundError("The contact with the requested ID does not exist.");
    }

    // Persist audit log — old vs new snapshot
    await this.auditRepo.logUpdate(id, existing, updated);
    return ContactSerializer.serialize(updated);
  }



  // ─── Delete contact (with audit log) ────────────────────────────────
  async deleteContact(id: string, user: UserTokenPayload): Promise<null> {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new NotFoundError("The contact with the requested ID does not exist.");
    }

    // Ownership check
    if (user.role !== "admin" && existing.user_id !== user.userId) {
      throw new NotFoundError("The contact with the requested ID does not exist.");
    }

    await this.repo.delete(id);
    await this.auditRepo.logDelete(id, existing);
    return null;
  }
}
