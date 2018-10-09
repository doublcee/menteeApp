import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html',
})
export class StartupPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
               public storage: Storage) {
  //  this.storage.set('checked', '');
  }

  onClose(){
    this.storage.set('checked', 'true');
    this.viewCtrl.dismiss();
  }

}
