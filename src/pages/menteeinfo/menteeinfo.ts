import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {ViewphotoPage} from "../viewphoto/viewphoto";

@Component({
  selector: 'page-menteeinfo',
  templateUrl: 'menteeinfo.html',
})
export class MenteeinfoPage {
  mentee : any = [];
  imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private modalCtrl: ModalController) {
  }

  ionViewCanEnter() {
    this.mentee = this.navParams.get('user');
  }

  onClose(){
    this.viewCtrl.dismiss();
  }

  onView(photo:string){
    let modal = this.modalCtrl.create(ViewphotoPage,{photo: photo});
    modal.present();
  }
}
