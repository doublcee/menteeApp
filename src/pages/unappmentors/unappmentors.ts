import { Component } from '@angular/core';
import {
    NavController, NavParams, LoadingController, ModalController, ToastController,
    AlertController, ItemSliding
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AuthService} from "../../services/auth";
import {SmentorinfoPage} from "../smentorinfo/smentorinfo";

@Component({
  selector: 'page-unappmentors',
  templateUrl: 'unappmentors.html',
})
export class UnappmentorsPage {
 mentors: any;
 imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private storage: Storage,
              private authService: AuthService,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
  }

  ionViewCanEnter() {
    let loader = this.loadCtrl.create({spinner:'dots',content:''});
    loader.present();
     this.storage.get('token').then((token) => {
       this.authService.unapprovedMentors(token)
           .subscribe((data) => {
         loader.dismissAll();
             this.mentors = data;
           },() => {
             loader.dismissAll();
               return this.toast('unable to connect. connection lost');
           });
     })
  }

  onMentor(mentor:any){
    let modal = this.modalCtrl.create(SmentorinfoPage,{mentor});
    modal.present();
  }

  onApprove(user:number, index:number,itemSliding:ItemSliding){
      itemSliding.close();
      this.storage.get('token').then((token) => {
          let alert = this.alertCtrl.create({
              message: 'Approve this account?',
              buttons: [{
                  text: 'Ok',
                  handler: () => {
                      console.log(user,index);
                      let loader = this.loadCtrl.create({spinner:'dots',content:'Processing.. please wait!'});
                      loader.present();
                      this.authService.approveAccount(user,token)
                          .subscribe((data) => {
                            loader.dismissAll();
                             if(data['success']){
                               this.toast(data['success']);
                               this.mentors.splice(index, 1);
                               return this.mentors;
                             }
                          },(err) => {
                            loader.dismissAll();
                             console.log(err);
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

  onDelete(user:number, index:number, itemSliding:ItemSliding){
      itemSliding.close();
      this.storage.get('token').then((token) => {
          let alert = this.alertCtrl.create({
              message: 'Delete this account?',
              buttons: [{
                  text: 'Ok',
                  handler: () => {
                      console.log(user,index);
                      let loader = this.loadCtrl.create({spinner:'dots',content:'Processing.. please wait!'});
                      loader.present();
                      this.authService.deleteAccount(user,token)
                          .subscribe((data) => {
                              loader.dismissAll();
                              if(data['success']){
                                  this.toast(data['success']);
                                  this.mentors.splice(index, 1);
                                  return this.mentors;
                              }
                          },(err) => {
                              loader.dismissAll();
                              console.log(err);
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

  toast(message:any){
      let toast = this.toastCtrl.create({
          message: message,
          duration:1000,
          position: 'top'
      });

      toast.present();
  }

}
