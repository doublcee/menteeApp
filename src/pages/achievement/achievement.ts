import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {GoalService} from "../../services/goal";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-achievement',
  templateUrl: 'achievement.html',
})
export class AchievementPage{
achievements:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private goalService: GoalService,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController,
              private storage: Storage) {
  }

  ionViewCanEnter(){
      this.storage.get('token').then((token) => {
          let loader = this.loadCtrl.create({spinner:'dots', content: 'loading...'});
          loader.present();
          this.goalService.getAchievements(token)
              .subscribe(data => {
                  loader.dismissAll();
                  console.log(data);
                  this.achievements = data;
              },() => {
                  loader.dismissAll();
                  this.toast('unable to connect. connection lost');
              })
          });
  }

  toast(message:string){
      let toast = this.toastCtrl.create({
          message:message,
          duration: 1000,
          position: 'top'
      });
      toast.present();
  }

}
