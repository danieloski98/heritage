export interface INotification {
  _id: string;
  user_id: string;
  message: string;
  user_type: number;
  read: boolean;
  createdAt: string;
}