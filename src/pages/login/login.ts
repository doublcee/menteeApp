import { Component } from '@angular/core';
import {DashboardPage} from "../dashboard/dashboard";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";
import {LoadingController, AlertController, NavController, ActionSheetController, ToastController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {MentorSignupPage} from "../mentor-signup/mentor-signup";
import {MenteeSignupPage} from "../mentee-signup/mentee-signup";
import {ForgotpasswordPage} from "../forgotpassword/forgotpassword";
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  dashboardPage = DashboardPage;
  fpasswordPage = ForgotpasswordPage;

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private loadCtrl: LoadingController,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private actionSheetCtrl: ActionSheetController,
              private toastCtrl: ToastController) {
  }

  signin(f:NgForm)
  {
    let loader = this.loadCtrl.create({content: 'login in...', spinner:'dots'});
    loader.present();
    this.authService.signin(f.value.email, f.value.password)
        .subscribe(data => {
            loader.dismissAll();
                if(data['access']){
                    return this.alertMsg(data['access']);
                }else if(data['banned']){
                    return this.alertMsg(data['banned']);
                }else if(data['notactive']){
                    return this.alertMsg(data['notactive']);
                }else if(data['id']){
                    this.storage.set('user_details', data);
                    this.storage.set('admin', data['admin']);
                    this.storage.set('userType', data['user_type']);
                    this.storage.set('user_id', data['id']);
                    this.storage.set('careerfield', data['careerfield']);
                    this.fetchToken(f.value.email, f.value.password);
                    f.reset();
                }

        }, () => {
          loader.dismissAll();
            this.popAlert('error occured, check connection and try again');
        })
  }

   alertMsg(message:any){
    let alert = this.alertCtrl.create({
       message: message,
       buttons:['Dismiss']
    });
    alert.present();
   }

  fetchToken(username:string, password:string)
  {
    return this.authService.getToken(username, password)
        .subscribe(res => {
          this.storage.set('token', res['access_token']);
        })
  }

  onSignup()
  {
      let actionSheet = this.actionSheetCtrl.create({
          title: 'Sign up as',
          buttons: [
              {
                  text: 'Mentor',
                  handler: () => {
                      this.navCtrl.push(MentorSignupPage);
                  }
              },
              {
                  text: 'Mentee',
                  handler: () => {
                      this.navCtrl.push(MenteeSignupPage);
                  }
              },
              {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                      console.log('event canceled');
                  }
              }
          ]
      });

      actionSheet.present();
  }

  popAlert(message: any)
  {
      let toast = this.toastCtrl.create({
          message: message,
          duration: 2000,
          position: 'top'
      });

      toast.present();
  }

}
