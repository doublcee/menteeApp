import { Component } from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {MenteeSignupPage} from "../mentee-signup/mentee-signup";
import {MentorSignupPage} from "../mentor-signup/mentor-signup";
import {LoginPage} from "../login/login";
import {HttpClient} from "@angular/common/http";
import { Storage } from '@ionic/storage';
import {StartupPage} from "../startup/startup";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginPage = LoginPage;
  menteeSignup = MenteeSignupPage;
  mentorSignup = MentorSignupPage;

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public modalCtrl: ModalController,
              public storage: Storage) {
  }


  ionViewDidEnter(){
    setTimeout(() => {
      this.storage.get('checked').then((check) => {
        if(!check){
          let modal = this.modalCtrl.create(StartupPage);
          modal.present();
        }
      });
    },1000);
  }

}
