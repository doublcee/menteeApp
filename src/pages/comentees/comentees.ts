import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ModalController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AuthService} from "../../services/auth";
import {ComenteedetailPage} from "../comenteedetail/comenteedetail";
import {SmscomenteePage} from "../smscomentee/smscomentee";


@Component({
  selector: 'page-comentees',
  templateUrl: 'comentees.html',
})
export class ComenteesPage {
  comentees: any;
  imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private loadCtrl: LoadingController,
              private authService: AuthService,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController) {
  }

  ionViewCanEnter(){
    let loader = this.loadCtrl.create({spinner:'dots', content: ''});
    loader.present();
    this.storage.get('token').then((token) => {
      this.storage.get('user_id').then((id) => {
        this.storage.get('mentorID').then((mentorID) => {
          this.authService.getCoMentees(token, mentorID, id)
              .subscribe(data => {
                loader.dismissAll();
                this.comentees = data;
              },() => {
                loader.dismissAll();
                //return this.toast('unable to connect. connection lost');
              })
        });
      });
    });
  }

  seeDetails(user: any){
    let modal = this.modalCtrl.create(ComenteedetailPage, {user});
    modal.present();
  }

  messageMentee(user: any)
  {
    this.navCtrl.push(SmscomenteePage, {user});
  }

  toast(message:string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


}
