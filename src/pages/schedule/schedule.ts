import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController, ToastController,} from 'ionic-angular';
import {GoalService} from "../../services/goal";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
Goals: any;
userID: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private goalService: GoalService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private storage: Storage) {
      this.storage.get('user_id').then((id) => {this.userID = id;})
  }

  ngOnInit(){
    let loader = this.loadCtrl.create({spinner:'dots', content: 'loading goals...'});
    loader.present();
    this.storage.get('token').then((token) => {
        this.storage.get('user_id').then((id) => {{
            this.goalService.schedules(id,token)
                .subscribe((data) => {
                    loader.dismissAll();
                    this.Goals = data;
                },() => {
                    loader.dismissAll();
                    return this.toast('unable to connect. connection lost');
                });
        }});
    });
  }

  onComplete(goalID:number, index:number, ID:number){
      this.storage.get('token').then((token) => {
          let alert = this.alertCtrl.create({
              title: 'Job Complete',
              message: 'Goal Completed?',
              buttons: [
                  {
                      text: 'Comfirm',
                      handler: () => {
                          let loader = this.loadCtrl.create({spinner:'dots', content: 'Processing...'});
                          loader.present();
                          this.goalService.processGoal(goalID,1,ID,token)
                              .subscribe(data => {
                                  loader.dismissAll();
                                  if(data['success']){
                                      this.toast(data['success']);
                                      this.Goals.splice(index, 1);
                                      return this.Goals;
                                  }else{
                                      this.toast(data['fail']);
                                  }
                              },() => {
                                  loader.dismissAll();
                                  return this.toast('unable to connect. connection lost');
                              });
                      }
                  },
                  {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                          console.log('cancelled');
                      }
                  }
              ]
          });
          alert.present();
      });
  }

  onNotComplete(goalID:number, index:number, userID:number){
      this.storage.get('token').then((token) => {
          let alert = this.alertCtrl.create({
              title: 'Terminate Goal',
              message: 'Do you want to terminate?',
              buttons: [
                  {
                      text: 'Comfirm',
                      handler: () => {
                          let loader = this.loadCtrl.create({spinner:'dots', content: 'Processing...'});
                          loader.present();
                          this.goalService.processGoal(goalID,2,userID,token)
                              .subscribe(data => {
                                  loader.dismissAll();
                                  if(data['success']){
                                      this.toast(data['success']);
                                      this.Goals.splice(index, 1);
                                      return this.Goals;
                                  }else{
                                      this.toast(data['fail']);
                                  }
                              },() => {
                                  loader.dismissAll();
                                  return this.toast('unable to connect. connection lost');
                              });
                      }
                  },
                  {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                          console.log('cancelled');
                      }
                  }
              ]
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
}
