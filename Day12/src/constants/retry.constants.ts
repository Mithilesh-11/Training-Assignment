
export const MAX_RETRY_ATTEMPTS = 4;

/**
 * Initial retry delay (milliseconds)
 */
export const BASE_DELAY = 1000;

/**
 * Exponential backoff multiplier
 */
export const BACKOFF_MULTIPLIER = 2;

/**
 * Retry Messages
 */
export const RETRY_MESSAGES = {
  FAILED: "Operation failed.",

  RETRYING: "Retrying operation...",

  MAX_RETRIES:"Maximum retry attempts reached.",
} as const;