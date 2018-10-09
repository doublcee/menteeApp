import {Component, ViewChild, OnInit} from '@angular/core';
import {NavController, Slides, AlertController, LoadingController, ToastController} from 'ionic-angular';
import {NgForm, FormGroup, Validators, FormControl} from "@angular/forms";
import {LoginPage} from "../login/login";
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-mentor-signup',
  templateUrl: 'mentor-signup.html',
})
export class MentorSignupPage implements OnInit{

loginPage = LoginPage;
type:number = 1;
@ViewChild(Slides) slides: Slides;
    signupForm: FormGroup;
    userData = {"title":"", "fname":"", "lname": "", "password":"", "email":"", "gender":"", "careerfield":"", "phone":""};
  constructor(private loadCtrl: LoadingController,
              public navCtrl: NavController,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private toastCtrl: ToastController) {
  }

  ngOnInit(){
      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.signupForm = new FormGroup({
          title: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(10)]),
          fname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(12)]),
          lname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(12)]),
          email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
          password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
          gender: new FormControl('', Validators.required),
          careerfield: new FormControl('', Validators.required),
          phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      });
  }

 signup(f: NgForm, type:number){
      let loader = this.loadCtrl.create({spinner:'dots', content: 'signing you up...'});
      loader.present();
     this.authService.signup(f.value,type)
         .subscribe(data => {
            loader.dismissAll();
          if(data['usernameExist']){
                this.mailExists(data['usernameExist']);
            }else{
              f.reset();
                this.success(data['success']);
            }
         },() => {
             loader.dismissAll();
             return this.toast('unable to connect. connection lost');
         })
 }

 mailExists(message: string){
     const alert  = this.alertCtrl.create({
         title: 'username exists',
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
