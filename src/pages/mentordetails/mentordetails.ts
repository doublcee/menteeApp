import { Component } from '@angular/core';
import {
  NavController, NavParams, ViewController, LoadingController,
  ToastController, ModalController
} from 'ionic-angular';
import { Storage } from '@ionic/storage'
import {AuthService} from "../../services/auth";
import {ViewphotoPage} from "../viewphoto/viewphoto";
@Component({
  selector: 'page-mentordetails',
  templateUrl: 'mentordetails.html',
})
export class MentordetailsPage {
mentordata: any =  [];
user_id: number;
  imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController,
              private storage: Storage,
              private authService: AuthService,
              private modalCtrl: ModalController) {
    this.storage.get('user_id').then((id) => {
      this.user_id = id;
    });
  }

  ionViewDidLoad() {
    this.mentordata = this.navParams.get('mentor');
    console.log(this.navParams.data);
  }

  onView(photo:string){
    let modal = this.modalCtrl.create(ViewphotoPage,{photo: photo});
    modal.present();
  }

  onclose(){
    this.viewCtrl.dismiss();
  }

  onrequest(mentor_id: number)
  {
    let loader = this.loadCtrl.create({content: 'requesting mentor...'});
    loader.present();
    this.authService.requestMentor(mentor_id, this.user_id)
        .subscribe(data => {
          loader.dismiss();
          if(data['sent']){
            this.popToast(data['sent']);
            this.viewCtrl.dismiss();
          }
        },() => {
          loader.dismiss();
          return this.popToast('unable to connect. connection lost');
        });
  }

  popToast(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }
}
