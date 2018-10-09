import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";
import { Storage } from "@ionic/storage";;
import {MessageModel} from "../../model/message";

@Component({
  selector: 'page-messagementee',
  templateUrl: 'messagementee.html',
})
export class MessagementeePage {
mentee: any = [];
from: number;
messages: MessageModel[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadCtrl: LoadingController,
              private authService: AuthService,
              private storage: Storage,
              private toastCtrl: ToastController) {
    this.storage.get('user_id').then((id) =>{
      this.from = id;
    });
  }

  ionViewCanEnter() {
    this.mentee = this.navParams.get('user')
      return this.messages;
  }

  onSend(f: NgForm, receiver:number){
      let loader = this.loadCtrl.create({ spinner:'dots', content: 'Sending...'});
      loader.present();
      this.storage.get('token').then((token) => {
          this.authService.sendmessage(f.value.msg_body, this.from, receiver, token)
              .subscribe(() => {
              loader.dismissAll();
                  let d = new Date().toISOString().split('T')[0];
                  this.messages.push(new MessageModel(f.value.msg_body,d));
                  f.reset();
                  this.toast('message sent.');
                  return this.messages;
              },() => {
              loader.dismissAll();
                  return this.toast('unable to connect. connection lost');
              });
      });
  }


  toast(message: string)
  {
        let toast = this.toastCtrl.create({
          message: message,
          duration: 1000,
          position: 'top'
        });
        toast.present();
  }

}
