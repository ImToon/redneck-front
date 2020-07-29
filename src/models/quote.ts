import { User } from './user';

export interface Quote{
    _id:string;
    creator:User;
    content:string;
    date:Date;
}