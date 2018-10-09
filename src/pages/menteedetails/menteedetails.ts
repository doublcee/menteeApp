import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, ModalController, PopoverController} from 'ionic-angular';
import {MessagementeePage} from "../messagementee/messagementee";
import {ViewphotoPage} from "../viewphoto/viewphoto";
import {PopoverPage} from "../popover/popover";

@Component({
  selector: 'page-menteedetails',
  templateUrl: 'menteedetails.html',
})
export class MenteedetailsPage {
mentee : any = [];
data: any;
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

  presentPopover(event: MouseEvent, page:string, user:any){
    this.data = {page:page, user:user};
    let popover = this.popoverCtrl.create(PopoverPage, this.data);
    popover.present({
      ev: event
    });
  }

  messageMentee(user: any)
  {
    this.navCtrl.push(MessagementeePage, {user});
  }

}
