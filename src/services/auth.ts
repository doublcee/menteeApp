import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
@Injectable()
export class AuthService {
    url: string;
    token_url: string;
    type: number;
    c_id: string;
    c_secret: string;
    grant_type: string;
    scope: string;
    token:string;

    constructor(private http: HttpClient, private storage: Storage) {
      // this.url = 'http://127.0.0.1:8000/api/';
     // this.token_url = 'http://127.0.0.1:8000/oauth/token';
        // this.url = 'http://10.0.2.2:8000/api/';
        //this.token_url = 'http://10.0.2.2:8000/oauth/token';
       this.url = "http://pursuitofpurposenetwork.com/mobileApp/api/";
       this.token_url = "http://pursuitofpurposenetwork.com/mobileApp/oauth/token";

        this.type = 1;
        this.c_id = '4';
        this.c_secret = 'eBdt1UZzsVHvxLtSSlkzDR4Ga04yI9ULwQrrR5lN';
        this.grant_type = 'password';
        this.scope = '';
        this.storage.get('token').then((token) => {this.token = token});
        this.storage.get('user_details').then((details) => { console.log(details); });
    }

    signup(user: any,type:number) {
        return this.http.post(this.url + 'signup',
            {title: user['title'], fname: user['fname'], lname: user['lname'], gender: user['gender'],
                 password: user['password'], email: user['email'], careerfield: user['careerfield'],
                phone: user['phone'], type: type
            }, {
                headers: {'Content-Type': 'application/json'}
            })
    }

    ismentor(token:string){
        return this.http.get(this.url+'user',
            {headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer '+token}})
    }

    ismentee(token:string){
        return this.http.get(this.url+'user',
            {headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer '+token}});
    }

    issuperadmin(token:string){
        return  this.http.get(this.url+'user',
            {headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer '+token}});
    }

    verifyMentor(token:string,id:number){
        return this.http.post(this.url+'checkMentor', {menteeID: id},
            {headers: {'Content-Type':'application/json','Authorization':'Bearer '+token}})
    }

    dashgetMentors(token:string){
        return  this.http.get(this.url+'getMentors',
            {headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer '+token}})
    }

    dashgetMentees(token:string){
        return this.http.get(this.url+'getMentees',
            {headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer '+token}})
    }

    dashgoalRequests(token:string){
        return this.http.get(this.url+'goalRequests',{headers:{'Content-Type':'application/json', 'Authorization':'Bearer '+token}});
    }

    verifyRequest(token:string,id:number){
        return this.http.post(this.url+'getRequest', {mentorID: id},
            {headers: {'Content-Type' : 'application/json','Authorization':'Bearer '+token}})
    }

    mteeRequests(token:string,id:number){
        return    this.http.post(this.url+'getRequest', {mentorID: id},
            {headers: {'Content-Type' : 'application/json','Authorization':'Bearer '+token}})
    }

    myMentor(token:string, id:number){
        return this.http.post(this.url+'myMentor',{menteeID: id},
            {headers: {'Content-Type':'application/json','Authorization':'Bearer '+token}})
    }

    myProfile(token:string){
        return this.http.get(this.url+'user',
            {headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer '+token}})
    }

    menteeSignup(user: any, type:number) {
        return this.http.post(this.url +'signup',
            {
                title: "N/A",
                fname: user['fname'],
                lname: user['lname'],
                gender: user['gender'],
                password: user['password'],
                email: user['email'],
                careerfield: user['careerfield'],
                phone: user['phone'],
                type: type
            }, {
                headers: {'Content-Type': 'application/json'}
            })
    }

    checkAccess(username: string, password: string) {
        return this.http.post(this.url + 'checkAccess', {username: username, password: password},
            {headers: {'Content-Type': 'application/json'}});
    }

    signin(email: string, password: string) {
        return this.http.post(this.url+'login', {email: email, password: password},
            {headers: {'Content-Type': 'application/json'}});
    }

    getToken(username: string, password: string) {
        return this.http.post(this.token_url,
            {grant_type: this.grant_type,
                client_id: this.c_id,
                client_secret: this.c_secret,
                username: username,
                password: password,
                scope: this.scope
            }, {headers: {'Content-Type': 'application/json'}});
    }

    getuser(token:string) {
        return this.http.get(this.url+'user',
            {headers: {
                'Accept':'application/json',
                'Authorization':'Bearer ' +token}});
    }

    getMentor()
    {
        return this.http.get(this.url+'getMentor',
                            {headers: {'Content-Type':'application/json','Authorization':'Bearer ' +this.token}});
    }

    requestMentor(mentor:number, mentee:number)
    {
        return this.http.post(this.url + 'requestMentor', {mentor: mentor, mentee: mentee},
            {headers: {'Content-Type': 'application/json','Authorization':'Bearer ' +this.token}});
    }


     getreplies(msgID:number){
         return this.http.post(this.url + 'getReplies', {msgID: msgID},
             {headers: {'Content-Type': 'application/json','Authorization':'Bearer ' +this.token}});
     }

    getmyMentor(id:number,token:string)
    {
        return this.http.post(this.url+'getmyMentor', {mentorID: id},
            {headers: {'Content-Type':'application/json', 'Authorization':'Bearer ' +token}});
    }

    getRequests(id: number){
        this.http.post(this.url+'getRequest', {mentorID: id},
                    {headers: {'Content-Type' : 'application/json','Authorization':'Bearer ' +this.token}})
    }

    acceptRequest(id: number, token:string){
        return this.http.post(this.url+'acceptRequest', {requestID: id}, {
                            headers: {'Content-Type': 'application/json','Authorization':'Bearer ' +token}});
    }

    declineRequest(id: number, token:string){
        return this.http.post(this.url+'declineRequest', {requestID: id}, {
            headers: {'Content-Type': 'application/json','Authorization':'Bearer ' +token}});
    }

    getMentees(id:number, token:string){
        return this.http.post(this.url+'myMentees', {mentorID: id},
            {headers: {'Content-Type' : 'application/json','Authorization':'Bearer ' +token}})
    }

    sendmessage(msg:string, from:number, to: number, token:string){
        return this.http.post(this.url+'sendMessage',{msg_body:msg, from:from, to:to},
                                {headers: {'Content-Type':'application/json','Authorization':'Bearer ' +token}});
    }

    getsentMsgs(id:number, token:string){
        return this.http.post(this.url+'sentMessages',{senderID: id},
                                {headers: {'Content-Type':'application/json','Authorization':'Bearer ' +token}});
    }

    getInboxMsgs(id: number, token:string){
        return this.http.post(this.url+'inboxMessages',{senderID: id},
            {headers: {'Content-Type':'application/json','Authorization':'Bearer ' +token}});
    }

    checkUnreadMsg(id:number, token:string){
        return this.http.post(this.url+'checkUnreadMsg',{userID: id},
            {headers: {'Content-Type':'application/json','Authorization':'Bearer ' +token}});
    }

    replyMsg(msg_id:number, reply:string, user_id:number){
        return this.http.post(this.url+'replyMsg',
                 {msg_id:msg_id, reply:reply, user_id:user_id},
                    {headers: {'Content-Type':'application/json','Authorization':'Bearer ' +this.token}});
    }

    updateUser(user:any,id:number,token:string)
    {
        return this.http.post(this.url+'updateProfile',{user:user, id:id},
                            {headers: {'Content-Type':'application/json','Authorization':'Bearer ' +token}});
    }

    msgRead(id:number, token:string)
    {
        return this.http.post(this.url+'readMsg', {msgID: id},
                                {headers: {'Content-Type': 'application/json','Authorization':'Bearer ' +token}});
    }

    deleteMsg(id:number,type:number,token:string)
    {
        return this.http.post(this.url+'deleteMsg', {msgID: id, type:type},
            {headers: {'Content-Type': 'application/json','Authorization':'Bearer ' +token}});
    }

    pickMentor(menteeID:number, careerfield:string, token:string){
        return this.http.post(this.url+'pickMentor',{menteeID:menteeID, careerfield:careerfield},
            {headers: {'Content-Type': 'application/json','Authorization':'Bearer ' +token}});
    }

    checkMentor(menteeID:number){
        return this.http.post(this.url+'checkMentor', {menteeID: menteeID},
            {headers: {'Content-Type':'application/json','Authorization':'Bearer '+this.token}})
    }

    getMentorID(userID:number, token:string)
    {
        return this.http.post(this.url+'getMentorID', {userID:userID},
            {headers: {'Content-Type':'application/json', 'Authorization':'Bearer ' +token}});
    }

    getPassword(email:string){
        return this.http.post(this.url+'getPassword', {email:email},
            {headers: {'Content-Type':'application/json'}});
    }

    getallMentees(token:string){
        return this.http.get(this.url+'getMentees',
            {headers: {'Content-Type':'application/json', 'Authorization':'Bearer ' +token}});
    }

    getallMentors(token:string){
        return this.http.get(this.url+'getMentors',
            {headers: {'Content-Type':'application/json', 'Authorization':'Bearer ' +token}});
    }

    getCoMentees(token:string, mentorID:number, myID:number){
         return this.http.post(this.url+'getCoMentees', {mentorID:mentorID, menteeID:myID},
             {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }

    unapprovedMentors(token:string){
        return this.http.get(this.url+'unappMentors',
            {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }

    unapprovedMentees(token:string){
        return this.http.get(this.url+'unappMentees',
            {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }

    approveAccount(userID:number, token:string){
        return this.http.post(this.url+'approveAccount', {user:userID},
            {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }

    deleteAccount(userID:number, token){
        return this.http.post(this.url+'deleteAccount', {user:userID},
            {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }

    suspendAccount(userID:number, token:string){
        return this.http.post(this.url+'suspendAccount', {user:userID},
            {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }

    unsuspendAccount(userID:number, token:string){
        return this.http.post(this.url+'unsuspendAccount', {user:userID},
            {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }

    reportUser(from:number, to:number, reason:string, body:string, token:string){
        return this.http.post(this.url+'reportUser', {by:from, to:to, reason:reason, body:body},
            {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }

    getReports(token:string){
        return this.http.get(this.url+'getReports',
            {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }

    reportCounts(token:string){
        return this.http.get(this.url+'reportCounts',
            {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }

    reportInfo(token:string, id:number){
        return this.http.post(this.url+'reportInfo', {id:id},
            {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }

    deletereport(token:string, id:number){
        return this.http.post(this.url+'deleteReport', {id:id},
            {headers: {'Content-Type' : 'application/json', 'Authorization':'Bearer '+token}});
    }
}