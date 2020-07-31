import { User } from './user';

export interface Quote{
    _id:string;
    author:User;
    content:string;
    quote:Quote;
    date:Date;
}