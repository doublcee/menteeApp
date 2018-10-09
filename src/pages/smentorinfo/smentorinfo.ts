import { Component } from '@angular/core';
import {NavController, NavParams, ModalController, ViewController} from 'ionic-angular';
import {ViewphotoPage} from "../viewphoto/viewphoto";

@Component({
  selector: 'page-smentorinfo',
  templateUrl: 'smentorinfo.html',
})
export class SmentorinfoPage {

  mentordata: any = [];
  imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private viewCtrl: ViewController) {
  }

  ionViewDidLoad(){
    this.mentordata = this.navParams.get('mentor');
  }

  onView(photo:string){
    let modal = this.modalCtrl.create(ViewphotoPage,{photo: photo});
    modal.present();
  }

  onClose(){
    this.viewCtrl.dismiss();
  }

}
