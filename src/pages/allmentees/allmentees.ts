import { Component } from '@angular/core';
import {
  NavController, NavParams, LoadingController, ToastController, ModalController,
  ItemSliding, AlertController
} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {Storage} from "@ionic/storage";
import {SmenteeinfoPage} from "../smenteeinfo/smenteeinfo";


@Component({
  selector: 'page-allmentees',
  templateUrl: 'allmentees.html',
})
export class AllmenteesPage {
mentees: any;
  imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private storage: Storage,
              private authService: AuthService,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) {
  }

  ionViewCanEnter() {
    let loader = this.loadCtrl.create({spinner:'dots', content: ''});
    loader.present();
    this.storage.get('token').then((token) => {
      this.authService.getallMentees(token)
          .subscribe(data => {
            loader.dismissAll();
            this.mentees = data;
          },() => {
            loader.dismissAll();
            return this.toast('unable to connect. connection lost');
          });
    });

  }

  onSuspend(user:number, index:number,itemSliding:ItemSliding,name:string){
    itemSliding.close();
    this.storage.get('token').then((token) => {
      let alert = this.alertCtrl.create({
        message: 'Suspend '+name+' ?',
        buttons: [{
          text: 'Ok',
          handler: () => {
            let loader = this.loadCtrl.create({spinner:'dots', content:'Processing.. please wait!'});
            loader.present();
            this.authService.suspendAccount(user,token)
                .subscribe((data) => {
                  loader.dismissAll();
                  if(data['success']){
                    this.toast(data['success']);
                    return this.mentees[index].bann = 1;
                  }
                },() => {
                  loader.dismissAll();

                })
          }
        },{
          text: 'Cancel',
          role: 'cancel',
        }]

      });

      alert.present();
    });


  }

  onunSuspend(user:number,index:number, itemSliding: ItemSliding,name:string){
    itemSliding.close();
    this.storage.get('token').then((token) => {
      let alert = this.alertCtrl.create({
        message: 'Unsuspend '+name+' ?',
        buttons: [{
          text: 'Ok',
          handler: () => {
            let loader = this.loadCtrl.create({spinner:'dots',content:'Processing.. please wait!'});
            loader.present();
            this.authService.unsuspendAccount(user,token)
                .subscribe((data) => {
                  loader.dismissAll();
                  if(data['success']){
                    this.toast(data['success']);
                    return this.mentees[index].bann = 0;
                  }
                },() => {
                  loader.dismissAll();
                })
          }
        },{
          text: 'Cancel',
          role: 'cancel',
        }]

      });

      alert.present();
    });


  }



  onDelete(user:number, index:number, itemSliding:ItemSliding,name:string){
    itemSliding.close();
    this.storage.get('token').then((token) => {
      let alert = this.alertCtrl.create({
        message: 'Delete '+name+' account?',
        buttons: [{
          text: 'Ok',
          handler: () => {
            let loader = this.loadCtrl.create({spinner:'dots',content:'Processing.. please wait!'});
            loader.present();
            this.authService.deleteAccount(user,token)
                .subscribe((data) => {
                  loader.dismissAll();
                  if(data['success']){
                    this.toast(data['success']);
                    this.mentees.splice(index, 1);
                    return this.mentees;
                  }
                },() => {
                  loader.dismissAll();
                })
          }
        },{
          text: 'Cancel',
          role: 'cancel',
        }]

      });

      alert.present();
    });

  }

  toast(message:string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  seeDetails(mentee:any){
    let modal = this.modalCtrl.create(SmenteeinfoPage,{user:mentee});
    modal.present();
  }


}
