import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {AddgoalPage} from "../addgoal/addgoal";
import {Storage} from "@ionic/storage";
import {GoalService} from "../../services/goal";

@Component({
  selector: 'page-goals',
  templateUrl: 'goals.html',
})
export class GoalsPage{
  addGoal = AddgoalPage;
  Goals: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadCtrl: LoadingController,
              private storage: Storage,
              private goalService: GoalService,
              private toastCtrl: ToastController) {
  }

  ionViewCanEnter(){
      let loader = this.loadCtrl.create({spinner:'dots', content: 'loading goals'});
      loader.present();
      this.storage.get('token').then((token) => {
          this.storage.get('user_id').then((id) => {{
              this.goalService.getGoal(id,token)
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

  toast(message:string){
      let toast = this.toastCtrl.create({
          message: message,
          duration: 2000,
          position: 'top'
      });
      toast.present();
  }

}
