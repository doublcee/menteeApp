import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ToastController, LoadingController, Content} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {CommunityService} from "../../services/community";
import {NgForm} from "@angular/forms";
import {ComMessage} from "../../model/community";

@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})

export class CommunityPage{
   @ViewChild(Content) content: Content;
   messages: ComMessage[];
   usertype:number;
   page = true;
   myID: number;
   mentorID:number;
   reqStatus: number;
   details:any;
   data: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
                private storage: Storage,
                private comService: CommunityService,
                private toastCtrl: ToastController,
                private loadCtrl: LoadingController) {
      this.storage.get('userType').then((type) => { this.usertype = type; });
      this.storage.get('user_id').then((userID) => {this.myID = userID});
      this.storage.get('reqStatus').then((status) => {this.reqStatus = status;});
      this.storage.get('mentorID').then((mentorID) => {this.mentorID = mentorID;});
      this.storage.get('user_details').then((details) => {this.details = details;});

  }

  ionViewWillEnter(){
     this.storage.get('userType').then((userType) => {
            if(userType == 1){
                this.mentor();
            }else{
                this.mentee();
            }
     });
  }

  ionViewDidEnter(){
          setTimeout(() => {
             this.scrollToBottom();
      },1);
  }

  scrollToBottom(){
     this.content.scrollToBottom();
  }

  mentor(){
   this.getMessage();
  }

  mentee(){
      if(this.reqStatus == 3){
          this.storage.get('mentorID').then((id) => {
              this.getMessage();
          });
      }
  }

  toast(message:string){
      let toast = this.toastCtrl.create({
          message: message,
          duration: 2000,
          position: 'top'
      });
   toast.present();
  }


  getMessage(){
      this.messages = this.comService.dispMsg();
  }
    addMessage(f:NgForm){
       let Msg = f.value.msgBody;
        let d = new Date().toISOString().split('T')[0];
        let loader = this.loadCtrl.create({spinner:'dots', content:''});
        loader.present();
      this.storage.get('token').then((token) => {
          this.storage.get('user_id').then((userID) => {
              if(this.usertype == 1){
                this.comService.addMessage(Msg,userID,userID,token)
                      .subscribe((data) => {
                         loader.dismissAll();
                          f.reset();
                          this.comService.addNewMsg(Msg, this.myID, userID, d, this.details);
                          this.getMessage();
                          return this.timeOut();
                      },() => {
                            loader.dismissAll();
                          this.toast('unable to connect. connection lost');
                      });
              }else{
                  this.storage.get('mentorID').then((mentorID) => {
                      this.comService.addMessage(Msg,mentorID,userID,token)
                          .subscribe((data) => {
                              loader.dismissAll();
                              f.reset();
                              this.comService.addNewMsg(Msg, this.myID, mentorID, d, this.details);
                              this.getMessage();
                              return this.timeOut();
                          },() => {
                              loader.dismissAll();
                              this.toast('unable to connect. connection lost');
                          });
                  });
              }
          });
      });
    }

    timeOut(){
      setTimeout(() => {
          this.scrollToBottom();
      },1);
     }

}
