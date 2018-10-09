import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-smenteedetails',
  templateUrl: 'smenteedetails.html',
})
export class SmenteedetailsPage {
  imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  mentee: any = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
  }

  ionViewCanEnter(){
   this.mentee = this.navParams.get('mentee');
  }

  onClose(){
    this.viewCtrl.dismiss();
  }

}
