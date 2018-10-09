import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, ModalController, PopoverController} from 'ionic-angular';
import {SmscomenteePage} from "../smscomentee/smscomentee";
import {ViewphotoPage} from "../viewphoto/viewphoto";
import {PopoverPage} from "../popover/popover";

@Component({
  selector: 'page-comenteedetail',
  templateUrl: 'comenteedetail.html',
})
export class ComenteedetailPage {

  data:any = [];
  mentee : any = [];
  imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private popoverCtrl: PopoverController) {
  }

  ionViewCanEnter() {
    this.mentee = this.navParams.get('user');
  }

  onView(photo:string){
    let modal = this.modalCtrl.create(ViewphotoPage,{photo: photo});
    modal.present();
  }

  onClose(){
    this.viewCtrl.dismiss();
  }

  messageMentee(user: any)
  {
    this.navCtrl.push(SmscomenteePage, {user});
  }

  presentPopover(event: MouseEvent, page:string, user:any){
    this.data = {page:page, user:user};
    let popover = this.popoverCtrl.create(PopoverPage, this.data);
    popover.present({
      ev: event
    });
  }


}
