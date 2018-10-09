import { Component } from '@angular/core';
import {
  NavController, NavParams, LoadingController, ToastController, AlertController,
  ItemSliding
} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import { Storage } from '@ionic/storage';
import {ViewreportPage} from "../viewreport/viewreport";

@Component({
  selector: 'page-allreport',
  templateUrl: 'allreport.html',
})
export class AllreportPage {
reports:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
               private authService: AuthService,
               private storage: Storage,
               private toastCtrl: ToastController,
               private alertCtrl: AlertController) {
  }

  ionViewCanEnter() {
    let loader = this.loadCtrl.create({content:''});
    loader.present();
    this.storage.get('token').then((token) => {
       this.authService.getReports(token)
           .subscribe((data) => {
         loader.dismissAll();
            this.reports = data;
           },() => {
           loader.dismissAll();
              //
           });
    });
  }

  onViewReport(id:number,user:any){
      this.navCtrl.push(ViewreportPage,{id:id, user});
  }

  deleteReport(repID:number, index:number, itemSliding: ItemSliding){
    itemSliding.close();
    this.storage.get('token').then((token) => {
      let alert = this.alertCtrl.create({
        title: 'Delete Report',
        message: 'are you sure to delete?',
        buttons: [
          {text: 'comfirm delete',
            handler: () => {
              let loader = this.loadCtrl.create({spinner:'dots', content: 'Processing.. please wait'});
              loader.present();
              this.authService.deletereport(token,repID)
                  .subscribe(data => {
                    loader.dismissAll();
                    if(data['success']){
                      this.popToast(data['success']);
                      this.reports.splice(index, 1);
                      return this.reports;
                    }
                  },() => {
                    //
                    loader.dismissAll();
                    this.popToast('unable to connect. connection lost');
                  });
            }
          },
          {text: 'cancel', role: 'cancel',
            handler: () => {
              console.log('canceled');
            }
          }
        ]

      });

      alert.present();
    });

  }

  popToast(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });
    toast.present()
  }

}
