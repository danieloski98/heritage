export interface IReturnType {
    error: boolean;
    trace?: any;
    successMessage?:string;
    errorMessage?: string;
    statusCode: number;
    data?: any;
}