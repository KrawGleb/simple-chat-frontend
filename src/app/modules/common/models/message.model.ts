import { User } from "./user.model";

export interface Message
{
  id: number;
  from: User;
  to: User;
  theme: string;
  content: string;
}
