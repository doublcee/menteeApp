import { Component } from '@angular/core';
import {
    NavController, NavParams, LoadingController, ToastController, ModalController,
    ViewController, PopoverController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AuthService} from "../../services/auth";
import {MessagementorPage} from "../messagementor/messagementor";
import {ViewphotoPage} from "../viewphoto/viewphoto";
import {PopoverPage} from "../popover/popover";
@Component({
  selector: 'page-mymentor',
  templateUrl: 'mymentor.html',
})
export class MymentorPage {
  mentordata: any = [];
  data:any = [];
  messageMentor = MessagementorPage;
    imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private loadCtrl: LoadingController,
              private authService: AuthService,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private viewCtrl: ViewController,
              private popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    let loader = this.loadCtrl.create({spinner:'dots', content: ''});
    loader.present();
    this.storage.get('user_id').then((id) => {
        this.storage.get('token').then((token) => {
          this.authService.myMentor(token,id)
                .subscribe(data => {
                    loader.dismissAll();
                    this.getMentor(data['mentor'], token);
                },() => {
                    loader.dismissAll();
                    return this.toast('unable to connect. connection failed');
                });
        });

    });

  }

  getMentor(id:number,token:string)
  {
      this.authService.getmyMentor(id,token)
          .subscribe(data => {
            this.mentordata = data;
          },() => {
              return this.toast('unable to connect. connection lost');
          })
  }

    onView(photo:string){
        let modal = this.modalCtrl.create(ViewphotoPage,{photo: photo});
        modal.present();
    }

   onmessageMentor(mentor:any){
      this.navCtrl.push(MessagementorPage, {mentor});
   }

   toast(message:string){
      let toast = this.toastCtrl.create({
          message: message,
          duration: 1000,
          position: 'top'
      });
      toast.present();
   }

    onClose(){
        this.viewCtrl.dismiss();
    }

    presentPopover(event: MouseEvent, page:string, user:any){
        this.data = {page:page, user:user};
        let popover = this.popoverCtrl.create(PopoverPage, this.data);
        popover.present({
            ev: event
        });
    }
}
