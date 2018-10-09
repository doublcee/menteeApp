import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-viewreport',
  templateUrl: 'viewreport.html',
})
export class ViewreportPage {
 repID: number;
 reporter: any = [];
 reportee: any = [];
 report: any = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
               private storage: Storage,
              private authService: AuthService) {
  }

  ionViewDidLoad() {
    this.repID = this.navParams.get('id');
    let loader = this.loadCtrl.create({content:''});
    loader.present();
    this.storage.get('token').then((token) => {
       this.authService.reportInfo(token, this.repID)
           .subscribe((data) => {
             loader.dismissAll();
             this.report = data['repinfo'];
             this.reportee = data['reportee'];
             this.reporter = this.navParams.get('user');
           },() => {
            loader.dismissAll();
             //
           })
    });

  }

}
