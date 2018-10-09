import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private loadCtrl: LoadingController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  ongetPassword(f:NgForm){
    let loader = this.loadCtrl.create({spinner:'dots', content: 'Processing... <br/> please wait'});
    loader.present();
      this.authService.getPassword(f.value.email)
          .subscribe((data) => {
            loader.dismissAll();
            if(data['Exist']){
              f.reset();
              this.alert('Success', data['Exist']);
            }else{
              this.alert('Email Not Found',data['notExist']);
            }
          },() => {
            loader.dismissAll();
            this.toast('unable to connect. connection lost');
          });
  }

  alert(title:string, message:string){
      let alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: ['OK']
      });
      alert.present();
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
