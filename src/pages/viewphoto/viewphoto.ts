import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-viewphoto',
  templateUrl: 'viewphoto.html',
})
export class ViewphotoPage {
  imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  photo:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.photo = this.navParams.get('photo');
  }

  onclose(){
    this.viewCtrl.dismiss();
  }
}
