import { Stats } from "./Stat.type";

export type User = {
  id:string;
  name:string;
  email:string;
  avatarUrl:string;
  phone?:string;
  createdAt?:string;
  updatedAt?:string;
  shop?:object;
  stats?:Stats;
}