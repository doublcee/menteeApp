import { Component } from '@angular/core';
import {
  NavController, NavParams, LoadingController, ModalController, AlertController,
  ToastController
} from 'ionic-angular';
import {GoalrequestdetailsPage} from "../goalrequestdetails/goalrequestdetails";
import {GoalService} from "../../services/goal";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-goalrequest',
  templateUrl: 'goalrequest.html',
})
export class GoalrequestPage {
requests: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private goalService: GoalService,
              private storage:Storage) {
  }

  ionViewCanEnter() {
    let loader = this.loadCtrl.create({spinner:'dots', content: 'loading requests...'});
    loader.present();
    this.storage.get('token').then((token) => {
    this.goalService.goalRequests(token)
          .subscribe((data) => {
            loader.dismissAll();
            this.requests = data;
          },() => {
            loader.dismissAll();
            return this.getToast('unable to connect. connection lost');
          })
    });
  }

  seeDetails(myrequest:any){
    let modal = this.modalCtrl.create(GoalrequestdetailsPage,myrequest);
    modal.present();
  }

  comfirmRequest(userID: number, index:number, goalID:number){
    let alert = this.alertCtrl.create({
      title: 'Comfirm Request',
      message: 'Goal Completed ?',
      buttons: [
        {
          text: 'Comfirm',
          handler: () => {
            this.sendComfirmRequest(userID,index,goalID);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },

      ]
    });
    alert.present();
  }

  deleteRequest(userID: number, index:number, goalID:number){
    let alert = this.alertCtrl.create({
      title: 'Delete Request',
      message: 'delete this request?',
      buttons: [
        {
          text: 'Comfirm',
          handler: () => {
          this.sendDeclineRequest(userID,index,goalID);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
      ]
    });
    alert.present();
  }

  sendComfirmRequest(userID:number, index:number, goalID:number){
    this.storage.get('token').then((token) => {
      let loader = this.loadCtrl.create({content: 'Processing...'});
      loader.present();
      this.goalService.processGoalRequests(userID,goalID,1,token)
          .subscribe(data => {
            loader.dismissAll();
            if(data['success']){
              this.getToast(data['success']);
              this.requests.splice(index,1);
              return this.requests;
            }else{
              this.getToast(data['failed']);
            }
          },() => {
            loader.dismissAll();
            this.getToast('unable to connect. connection lost');
          });
    });
  }

  sendDeclineRequest(userID:number, index:number, goalID:number){
    this.storage.get('token').then((token) => {
      let loader = this.loadCtrl.create({content: 'Processing...'});
      loader.present();
      this.goalService.processGoalRequests(userID,goalID,2,token)
          .subscribe(data => {
            loader.dismissAll();
            if(data['success']){
              this.getToast(data['success']);
              this.requests.splice(index, 1);
              return this.requests;
            }else{
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
