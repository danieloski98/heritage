export interface ReturnTypeInterfcae {
  error: boolean;
  errorMessage?: string;
  statusCode?: number;
  data?: any;
  trace?: any;
  successMessage?: string;
}

export function Return(payload: ReturnTypeInterfcae) {
  return payload;
}
