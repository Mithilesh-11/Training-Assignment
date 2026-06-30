import { BASE_DELAY,MAX_RETRY_ATTEMPTS,} from "../constants/retry.constants.js";

export class RetryService {

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    let lastError: unknown;

    for ( let attempt = 1;attempt <= MAX_RETRY_ATTEMPTS;attempt++) {

      try {
        return await operation();
      } 
      catch (error) {
        lastError = error;
        console.error( `Attempt ${attempt} failed.`);
        if (attempt === MAX_RETRY_ATTEMPTS) {
          break;
        }

        const delay = BASE_DELAY *  Math.pow(2, attempt - 1);

        console.log(`Retrying in ${delay} ms...`);
        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  /**
   * Delay execution
   */
  private sleep( ms: number): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(resolve, ms)
    );
  }
}