import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
message: any = [];
mymessage: any = [];
user: any = [];
userID: number;
userType:number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private toastCtrl: ToastController) {
        this.storage.get('user_id').then((id) => {
             this.userID = id
        });
        this.storage.get('userType').then((type) => {
            this.userType = type;
        });
  }

  ionViewDidLoad() {
    console.log(this.navParams.data);
    this.user = this.navParams.get('user');
    this.message = this.navParams.get('message');
  }

  toast(message: string){
    let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'top'
    });
    toast.present();
  }
}
