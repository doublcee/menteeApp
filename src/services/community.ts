import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ComMessage} from "../model/community";
import {UserModel} from "../model/user";

@Injectable()
export class CommunityService{
    messages: ComMessage[] = [];
    //url: string = "http://127.0.0.1:8000/api/";
   // url: string = "http:10.0.2.2:8000/api/";
    url: string = "http://pursuitofpurposenetwork.com/mobileApp/api/";
    constructor(private http: HttpClient){}

    pushMessages(data:any){
        for(let i=0; i < data.length; i++){
            this.messages.push(new ComMessage(data[i]['comMsgBody'], data[i]['comMsgBy'],
                data[i]['comID'], data[i]['comMsgDate'], data[i]['user']));
        }
    }

    addNewMsg(msg:string, id:number, userID:number, date:string, details:UserModel){
        this.messages.push(new ComMessage(msg, id, userID, date, details));
    }

    dispMsg(){
       return this.messages.slice();
    }

    emptyArray(){
        this.messages.splice(0);
    }

    addMessage(msgBody:string, comID:number, userID:number,token:string){
        return this.http.post(this.url+'addComMessage',
            {msgBody:msgBody,userID:userID,comID:comID},
            {headers: {'Content-Type':'application/json','Authorization':'Bearer '+token}});
    }

    getMessages(comID:number,token:string){
        return this.http.post(this.url+'getComMessages',{comID:comID},
            {headers:{'Content-Type':'application/json','Authorization':'Bearer '+token}});
    }
}