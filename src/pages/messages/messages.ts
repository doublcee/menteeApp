import { Component } from '@angular/core';
import {
    NavController, NavParams, LoadingController, ToastController, AlertController,
    ItemSliding
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AuthService} from "../../services/auth";
import {MessagePage} from "../message/message";
import {SentMessagePage} from "../sent-message/sent-message";

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
messages: any;
user: any;
sentMessages = SentMessagePage;
read = false;
userType:number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private storage: Storage,
              private authService: AuthService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
      this.storage.get('userType').then((type) => {
          this.userType = type;
      });
  }

  ionViewDidLoad() {
      let loader = this.loadCtrl.create({spinner:'dots', content: 'loading messages...'});
      loader.present();
      this.storage.get('token').then((token) => {
          this.storage.get('user_id').then((id) => {
              this.authService.getInboxMsgs(id,token)
                  .subscribe(data => {
                      loader.dismissAll();
                      this.messages = data;
                  },() => {
                      loader.dismissAll();
                      return this.popToast('unable to connect. connection lost');
                  });
          });
      });

  }

  gotoMessage(message: any, user:any, msgID:number){
      this.storage.get('token').then((token) => {
          this.authService.msgRead(msgID, token)
              .subscribe(data => {
                  if(data['success'] || data['msgRead']){
                      this.navCtrl.push(MessagePage,{message:message,user:user});
                  }
              },() => {
                  this.popToast('unable to connect. connection lost');
              });
      });
  }

  deleteMsg(msgID:number, index:number, type:number, itemSliding: ItemSliding){
      itemSliding.close();
      this.storage.get('token').then((token) => {
          let alert = this.alertCtrl.create({
              title: 'Delete message',
              message: 'are you sure to delete?',
              buttons: [
                  {text: 'comfirm delete',
                      handler: () => {
                          let loader = this.loadCtrl.create({content: 'deleting message ...'});
                          loader.present();
                          this.authService.deleteMsg(msgID,type, token)
                              .subscribe(data => {
                                  loader.dismissAll();
                                  if(data['success']){
                                      this.popToast(data['success']);
                                      this.messages.splice(index, 1);
                                      return this.messages;
                                  }else{
                                      this.popToast(data['fail']);
                                  }
                              },() => {
                                  loader.dismissAll();
                                  this.popToast('unable to connect. connection lost');
                              });
                      }
                  },
                  {text: 'cancel', role: 'cancel',
                      handler: () => {
                          console.log('canceled');
                      }
                  }
              ]

          });

          alert.present();
      });

  }

  popToast(message: string){
      let toast = this.toastCtrl.create({
          message: message,
          duration: 1000,
          position: 'top'
      });
      toast.present()
  }
}

