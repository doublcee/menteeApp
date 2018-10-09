import {UserModel} from "./user";
export class ComMessage{
    constructor(public comMsgBody:string,
                public comMsgBy:number,
                public comID:number,
                public comMsgDate:string,
                public user: UserModel) {}
}