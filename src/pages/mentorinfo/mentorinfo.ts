import { Component } from '@angular/core';
import {
    NavController, NavParams, ViewController, ModalController, LoadingController,
    ToastController
} from 'ionic-angular';
import {ViewphotoPage} from "../viewphoto/viewphoto";
import {AuthService} from "../../services/auth";
import { Storage } from '@ionic/storage';
import {MenteeinfoPage} from "../menteeinfo/menteeinfo";

@Component({
  selector: 'page-mentorinfo',
  templateUrl: 'mentorinfo.html',
})
export class MentorinfoPage {
  mentordata: any = [];
    imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
    mentID: number;
    mentees: any;
    mentor:any;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private viewCtrl: ViewController,
                private modalCtrl: ModalController,
                private authService: AuthService,
                private storage: Storage,
                private loadCtrl: LoadingController,
                private toastCtrl: ToastController) {
    }

    ionViewDidLoad(){
        this.mentor = this.navParams.get('mentor');
        let loader = this.loadCtrl.create({spinner:'dots',content: ''});
        loader.present();
        this.mentID = this.mentor.id;
        this.storage.get('token').then((token) => {
            this.authService.getMentees(this.mentID,token)
                .subscribe(data => {
                    loader.dismissAll();
                    this.mentordata = this.navParams.get('mentor');
                    this.mentees = data;
                },() => {
                    loader.dismissAll();
                    return this.toast('unable to connect. connection lost');
                   //
                });
        });

    }

    onView(photo:string){
        let modal = this.modalCtrl.create(ViewphotoPage,{photo: photo});
        modal.present();
    }

    onMentee(mentee:any){
        let modal = this.modalCtrl.create(MenteeinfoPage, {user:mentee});
        modal.present();
    }

    onClose(){
        this.viewCtrl.dismiss();
    }

    toast(message:string){
        let toast = this.toastCtrl.create({
            message:message,
            duration:1000,
            position:'top'
        });
        toast.present();
    }

}
