import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {MessageModel} from "../../model/message";
import {NgForm} from "@angular/forms";
import {Storage} from '@ionic/storage';
import {AuthService} from "../../services/auth";


@Component({
  selector: 'page-smscomentee',
  templateUrl: 'smscomentee.html',
})
export class SmscomenteePage {
  mentee: any = [];
  from: number;
  messages: MessageModel[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private storage: Storage,
              private authService: AuthService,
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
          },(err) => {
        console.log(err);
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
