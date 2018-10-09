import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {GoalService} from "../../services/goal";
import {Storage} from '@ionic/storage';


@Component({
  selector: 'page-addgoal',
  templateUrl: 'addgoal.html',
})
export class AddgoalPage {
userID: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private goalService: GoalService,
              private loadCtrl: LoadingController,
              private storage: Storage,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
      this.storage.get('user_id').then((id) => {this.userID  = id;});
  }

  onAddGoal(f: NgForm,user:number)
  {
      this.storage.get('token').then((token) => {
          let loader = this.loadCtrl.create({spinner:'dots', content: 'Adding goal...'});
          loader.present();
          this.goalService.addGoal(f.value.goalDesc,f.value.startDate,f.value.endDate,user,token)
              .subscribe(data => {
                  loader.dismissAll();
                      f.reset();
                      this.toast(data['success']);
                      this.navCtrl.pop();
              },()=>{
                  loader.dismissAll();
                  return this.toast('unable to connect. connection lost');
              })
      });
  }

  popAlert(title:string, message:string){
      let alert = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: ['OK']
      });

      alert.present();
  }

  toast(message:string){
      let toast = this.toastCtrl.create({
          message:message,
          duration:2000,
          position: 'top'
      });

      toast.present();
  }

}
