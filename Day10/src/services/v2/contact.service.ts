import { v4 as uuid } from "uuid";
import { ContactInput, UpdateContactInput } from "../../validators/v2/contact.schema";
import { ContactListQueryInput } from "../../validators/v2/contact.schema";
import { PaginatedContacts, SerializedContact } from "../../types/v2/contact.types";
import { ConflictError, NotFoundError } from "../../errors/custom-errors";
import { ContactRepositoryV2 } from "../../repositories/v2/contact.repository";
import { AuditLogRepository } from "../../repositories/v2/auditLog.repository";
import { ContactSerializer } from "../../serializers/contact.serializer";

export class ContactServiceV2 {
  private repo = new ContactRepositoryV2();
  private auditRepo = new AuditLogRepository();

  // ─── List contacts with cursor pagination ────────────────────────────
  async getAllContacts(query: ContactListQueryInput): Promise<PaginatedContacts> {
    const rows = await this.repo.findAll(query);

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
  async getContactById(id: string): Promise<SerializedContact> {
    const contact = await this.repo.findById(id);
    if (!contact) {
      throw new NotFoundError("The contact with the requested ID does not exist.");
    }
    return ContactSerializer.serialize(contact);
  }

  // ─── Create contact ──────────────────────────────────────────────────
  async createContact(data: ContactInput): Promise<SerializedContact> {
    const existing = await this.repo.findByEmail(data.email);
    if (existing) {
      throw new ConflictError("A contact already exists with this email address.");
    }

    const id = uuid();
    const created = await this.repo.create(id, data);
    return ContactSerializer.serialize(created);
  }

  
  // ─── Update contact (with audit log) ────────────────────────────────
  async updateContact(id: string, data: UpdateContactInput): Promise<SerializedContact> {
    const existing = await this.repo.findById(id);
    if (!existing) {
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
  async deleteContact(id: string): Promise<null> {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new NotFoundError("The contact with the requested ID does not exist.");
    }
    await this.repo.delete(id);
    await this.auditRepo.logDelete(id, existing);
    return null;
  }
}
