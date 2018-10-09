import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import { Storage } from '@ionic/storage';
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  user:any = [];
  myID:number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private loadCtrl: LoadingController,
              private alertCtrl: AlertController,
              private authService: AuthService) {
    this.storage.get('user_id').then((id) => {this.myID = id;});
  }

  ionViewDidLoad() {
    console.log(this.navParams.data);
    this.user = this.navParams.get('user');
  }

  onReport(f:NgForm, userID:number){
    let loader = this.loadCtrl.create({content:'reporting.. please wait!'});
    loader.present();
    this.storage.get('token').then((token) => {
        this.authService.reportUser(this.myID,userID,f.value.reason,f.value.body,token)
            .subscribe((data) => {
          loader.dismissAll();
              if(data['success']){
                f.reset();
                this.navCtrl.pop();
                this.alert(data['success']);
              }
            },(err) => {
          loader.dismissAll();
          console.log(err);
      });

      });
  }

  alert(message:string){
    let alert = this.alertCtrl.create({
        message:message,
        buttons: ['Dismiss']
    });
    alert.present();
  }

}
