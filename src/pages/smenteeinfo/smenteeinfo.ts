import { Component } from '@angular/core';
import {
  NavController, NavParams, ViewController, ModalController, LoadingController,
  ToastController
} from 'ionic-angular';
import {ViewphotoPage} from "../viewphoto/viewphoto";
import { Storage } from '@ionic/storage';
import {AuthService} from "../../services/auth";
import {SmentorinfoPage} from "../smentorinfo/smentorinfo";

@Component({
  selector: 'page-smenteeinfo',
  templateUrl: 'smenteeinfo.html',
})
export class SmenteeinfoPage {
  mentee : any = [];
  mentor: any = [];
  user: any;
  hasmentor = false;
  imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private loadCtrl: LoadingController,
              private storage: Storage,
              private authService: AuthService,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
      this.user = this.navParams.get('user');
    let loader = this.loadCtrl.create({spinner:'dots',content:''});
    loader.present();
    this.storage.get('token').then((token) => {
      this.authService.myMentor(token,this.user.id)
          .subscribe(data => {
            loader.dismissAll();
            console.log(data);
            if(data == null){
                this.mentee = this.navParams.get('user');
                this.hasmentor = false;
            }else{
              this.getMentor(data['mentor'], token);
            }
          },() => {
            loader.dismissAll();
            return this.toast('unable to connect. connection failed');
          });
    });
  }

  getMentor(id:number,token:string)
  {
    this.authService.getmyMentor(id,token)
        .subscribe((data) => {
            this.mentee = this.navParams.get('user');
            this.hasmentor = true;
            this.mentor = data;
        },() => {
          return this.toast('unable to connect. connection lost');
        })
  }

  onClose(){
    this.viewCtrl.dismiss();
  }

  toast(message:string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  onMentor(mentor:any){
    let modal = this.modalCtrl.create(SmentorinfoPage,{mentor:mentor});
    modal.present();
  }

  onView(photo:string){
    let modal = this.modalCtrl.create(ViewphotoPage,{photo: photo});
    modal.present();
  }

}
