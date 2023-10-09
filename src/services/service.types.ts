export interface APIErrorType {
  success: boolean;
  status: number | string;
  message: string;
  stack?: string;
}
