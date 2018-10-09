import {Component} from '@angular/core';
import {NavController, NavParams, ModalController, LoadingController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AuthService} from "../../services/auth";
import {MenteedetailsPage} from "../menteedetails/menteedetails";
import {MessagementeePage} from "../messagementee/messagementee";
@Component({
  selector: 'page-mymentees',
  templateUrl: 'mymentees.html',
})
export class MymenteesPage{
    mentees: any ;
    imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private loadCtrl: LoadingController,
              private authService: AuthService,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController) {
  }

  ionViewCanEnter(){
      let loader = this.loadCtrl.create({spinner:'dots', content: ''});
      loader.present();
      this.storage.get('token').then((token) => {
          this.storage.get('user_id').then((id) => {
              this.authService.getMentees(id,token)
                  .subscribe(data => {
                      loader.dismissAll();
                      this.mentees = data;
                  },() => {
                      loader.dismissAll();
                      return this.toast('unable to connect. connection lost');
                  })
          });
      });
  }

    seeDetails(user: any){
        let modal = this.modalCtrl.create(MenteedetailsPage, {user});
        modal.present();
    }

    messageMentee(user: any)
    {
        this.navCtrl.push(MessagementeePage, {user});
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
