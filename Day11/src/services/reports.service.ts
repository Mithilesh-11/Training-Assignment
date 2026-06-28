import { ContactRepositoryV2 } from "../repositories/contact.repository";
import { UserTokenPayload } from "../types/auth.types";

export interface ContactStats {
  totalContacts: number;
  addedToday: number;
  mostCommonEmailDomain: string | null;
}

export class ReportsService {
  
  private repo = new ContactRepositoryV2();

  async getContactStats(user: UserTokenPayload): Promise<ContactStats> {
    
    const totalContacts = await this.repo.countTotal(user);
    const addedToday = await this.repo.countAddedToday(user);
    const mostCommonEmailDomain = await this.repo.mostCommonEmailDomain(user);

    return {
      totalContacts,
      addedToday,
      mostCommonEmailDomain,
    };
  }
}
