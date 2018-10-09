export class UserModel{
    constructor(
       public id:number,
       public title:string,
       public fname:string,
       public lname:string,
       public username:string,
       public cpassword:string,
       public gender:string,
       public idtype:string,
       public email:string,
       public careerfield:string,
       public phone:string,
       public user_type:number,
       public admin:number,
       public photo:string
    ){}
}