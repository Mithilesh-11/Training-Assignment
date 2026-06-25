export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  version: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  error: null;
}

export interface ApiErrorResponse {
  success: false;
  data: null;
  error: {
    status: number;
    code: string;
    message: string;
  };
}