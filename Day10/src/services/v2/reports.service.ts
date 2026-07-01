import { ContactRepositoryV2 } from "../../repositories/v2/contact.repository";

export interface ContactStats {
  totalContacts: number;
  addedToday: number;
  mostCommonEmailDomain: string | null;
}

export class ReportsService {
  
  private repo = new ContactRepositoryV2();

  async getContactStats(): Promise<ContactStats> {
    
    const totalContacts = await this.repo.countTotal();
    
    // 2. Then wait for today's count to finish
    const addedToday = await this.repo.countAddedToday();
    
    // 3. Then wait for the email domain query to finish
    const mostCommonEmailDomain = await this.repo.mostCommonEmailDomain();


    return {
      totalContacts,
      addedToday,
      mostCommonEmailDomain,
    };
  }
}
