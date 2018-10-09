import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { Storage } from "@ionic/storage";
import {AuthService} from "../../services/auth";
import {NgForm, FormGroup, Validators, FormControl} from "@angular/forms";
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage implements OnInit{
  userinfo: any = [];
  menteeForm: FormGroup;
  mentorForm: FormGroup;
  sAdminForm: FormGroup;

  constructor(public storage: Storage,
              public navCtrl: NavController,
              public navParams: NavParams,
              public loadCtrl: LoadingController,
              private authService: AuthService,
                private toastCtrl: ToastController) {
  }


  ngOnInit(){
      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.menteeForm = new FormGroup({
          fname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(12)]),
          lname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(12)]),
          password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
          email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
          gender: new FormControl('', Validators.required),
          phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)]),
          userType: new FormControl('',Validators.required)
      });

      this.mentorForm = new FormGroup({
          title: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(10)]),
          fname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(12)]),
          lname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(12)]),
          password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
          email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
          gender: new FormControl('', Validators.required),
          phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)]),
          userType: new FormControl('',Validators.required)
      });
  }

  ionViewCanEnter() {
    let loader = this.loadCtrl.create({spinner:'dots', content: ''});
    loader.present();
    this.storage.get('token').then((token) => {
      this.authService.getuser(token)
          .subscribe(data => {
            loader.dismissAll();
             this.userinfo = data;
          },() => {
            loader.dismissAll();
            return this.toast('unable to connect. connection lost');
          })
    })
  }
    onUpdate(f: NgForm, id:number){
      let loader = this.loadCtrl.create({spinner:'dots', content: 'updating...'});
      loader.present();
      this.storage.get('token').then((token) => {
          this.authService.updateUser(f.value,id,token)
              .subscribe(data => {
                  loader.dismissAll()
                  if(data['success']){
                      this.toast(data['success']);
                      this.navCtrl.pop();
                  }else{
                      this.toast(data['fail']);
                  }
              },() => {
                  loader.dismissAll();
                  this.toast('unable to connect. connection lost');
              })
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
