import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, LoadingController, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {NgForm, FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-mentee-signup',
  templateUrl: 'mentee-signup.html',
})
export class MenteeSignupPage implements OnInit {
    signupForm: FormGroup;
loginPage = LoginPage;
type: number = 2;
userData = {"fname":"", "lname": "", "password":"", "email":"", "gender":"", "careerfield":"", "phone":""};
//    userData = any;
  constructor(private authService: AuthService,
              public navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }

  ngOnInit(){
      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.signupForm = new FormGroup({
          fname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(12)]),
          lname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(12)]),
          email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
          password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
          gender: new FormControl('', Validators.required),
          careerfield: new FormControl('', Validators.required),
          phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      });
  }

  menteesignup(f: NgForm,type:number)
  {
    console.log(f.value);
   let loader = this.loadCtrl.create({spinner:'dots', content: 'signing you up...'});
    loader.present();
    this.authService.menteeSignup(f.value,type)
        .subscribe(data => {
          loader.dismissAll();
          if(data['emailExist']){
            this.mailExists(data['emailExist']);
          }else{
            f.reset();
            this.success(data['success']);
          }
        },() => {
          loader.dismissAll();
          return this.toast('unable to connect. connection lost');
        });
  }

  mailExists(message: string){
    const alert  = this.alertCtrl.create({
      title: 'Email exists',
      message: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  success(message: string){
    const alert  = this.alertCtrl.create({
      title: 'Success!',
      message: message,
      buttons: ['Dismiss']
    });
    alert.present();
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
