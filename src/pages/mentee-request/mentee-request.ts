import { Component } from '@angular/core';
import {
    NavController, NavParams, LoadingController, ToastController, AlertController,
    ModalController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AuthService} from "../../services/auth";
import {HttpClient} from "@angular/common/http";
import {MenteeinfoPage} from "../menteeinfo/menteeinfo";

@Component({
  selector: 'page-mentee-request',
  templateUrl: 'mentee-request.html',
})
export class MenteeRequestPage {
  requestinfo: any;
  url: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadCtrl: LoadingController,
              public toastCtrl: ToastController,
              public storage: Storage,
              public alertCtrl: AlertController,
              public authService: AuthService,
              public http: HttpClient,
              public modalCtrl: ModalController) {
  }

  ionViewCanEnter() {
      let loader = this.loadCtrl.create({spinner:'dots', content: 'loading requests ...'});
      loader.present();
      this.storage.get('user_id').then((id) => {
          this.storage.get('token').then((token) => {
           this.authService.mteeRequests(token,id)
                  .subscribe(data => {
                      loader.dismissAll();
                      if(data['noRecord']){
                         //
                      }else{
                          this.requestinfo = data;
                      }
                  },() => {
                      loader.dismissAll();
                      return this.getToast('unable to connect. connection lost');
                  })
          });

      });
  }

  seeDetails(user: any){
     let modal = this.modalCtrl.create(MenteeinfoPage, {user});
     modal.present();
  }

  acceptRequest(id: number, index:number){
    let alert = this.alertCtrl.create({
        title: 'Accept Request',
        message: 'Accept this request?',
        buttons: [
            {
                text: 'Comfirm',
                handler: () => {
                    this.sendAcceptRequest(id,index);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                   //
                }
            },

        ]
    });
    alert.present();
  }

  deleteRequest(id: number, index:number){
      let alert = this.alertCtrl.create({
          title: 'Delete Request',
          message: 'delete this request?',
          buttons: [
              {
                  text: 'Comfirm',
                  handler: () => {
                   this.sendDeclineRequest(id, index);
                  }
              },
              {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                     //
                  }
              },
          ]
      });

      alert.present();
  }

  sendAcceptRequest(id: number, index:number){
      let loader = this.loadCtrl.create({spinner:'dots', content: 'Processing...'});
      loader.present();
      this.storage.get('token').then((token) => {
          this.authService.acceptRequest(id,token)
              .subscribe(data => {
                  if(data['success']){
                      loader.dismissAll();
                      this.getToast(data['success']);
                      this.requestinfo.splice(index, 1);
                      return this.requestinfo;
                  }else{
                      loader.dismissAll();
                      this.getToast(data['failed']);
                  }
              },() => {
                  loader.dismissAll();
                  return this.getToast('unable to connect. connection lost');
              });
      });
  }

    sendDeclineRequest(id: number, index:number){
        let loader = this.loadCtrl.create({spinner:'dots', content: 'Processing...'});
        loader.present();
      this.storage.get('token').then((token) => {
          this.authService.declineRequest(id,token)
              .subscribe(data => {
                  loader.dismissAll();
                  if(data['success']){
                      this.getToast(data['success']);
                      this.requestinfo.splice(index, 1);
                      return this.requestinfo;
                  }else{
                      loader.dismissAll();
                      this.getToast(data['failed']);
                  }
              },() => {
                  loader.dismissAll();
                  return this.getToast('unable to connect. connection lost');
              });
      });
    }

    getToast(message: string)
    {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'top'
        });
        toast.present();
    }
}
