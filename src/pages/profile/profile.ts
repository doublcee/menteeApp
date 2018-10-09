import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController, ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {EditprofilePage} from "../editprofile/editprofile";
import {HomePage} from "../home/home";
import {ImageuploadPage} from "../imageupload/imageupload";
import {AuthService} from "../../services/auth";
import {ViewphotoPage} from "../viewphoto/viewphoto";
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
 token: string;
 userinfo: any = [];
 editProfilePage = EditprofilePage;
    imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public http: HttpClient,
              private storage: Storage,
              public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
               private toastCtrl: ToastController,
                private authService: AuthService,
                private modalCtrl: ModalController) {

  }

 ionViewCanEnter()
 {
     let loader = this.loadCtrl.create({spinner:'dots', content: ''});
     loader.present();
    this.storage.get('token').then((token) => {
      this.authService.myProfile(token)
             .subscribe(res => {
                 loader.dismissAll();
                 this.userinfo = res;
             },() => {
                 loader.dismissAll();
                 return this.toast('unable to connect. connection lost');
             });
     });
 }

    onView(photo:string){
        let modal = this.modalCtrl.create(ViewphotoPage,{photo: photo});
        modal.present();
    }

    logout(){
      let loader = this.loadCtrl.create({content: ''});
      loader.present();
        this.storage.set('token','');
        this.storage.set('user_id','');
        this.storage.set('userType','');
        this.storage.set('user_details','');
        this.storage.set('mentorID','');
        loader.dismissAll();
        this.navCtrl.setRoot(HomePage);

    }

    imageUpload()
    {
        this.navCtrl.push(ImageuploadPage);
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
