import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {MessagementorPage} from "../messagementor/messagementor";
import {MessagementeePage} from "../messagementee/messagementee";
import {ReportPage} from "../report/report";
import {SmscomenteePage} from "../smscomentee/smscomentee";

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
page:string;
user:any = [];
ismentee = false;
ismentor = false;
iscomentee = false
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.page = this.navParams.get('page');
    if(this.page == 'mentee'){
      this.user = this.navParams.get('user');
      this.ismentee = true;
    }else if(this.page == 'mentor'){
      this.ismentor = true;
      this.user = this.navParams.get('user');
    }else{
      this.iscomentee = true;
      this.user = this.navParams.get('user');
    }
  }

  messageMentee(user: any)
  {
    this.navCtrl.push(MessagementeePage, {user});
    this.viewCtrl.dismiss();

  }

  onmessageMentor(mentor:any){
    this.navCtrl.push(MessagementorPage, {mentor});
    this.viewCtrl.dismiss();

  }


  close(){
    this.viewCtrl.dismiss();
  }

  reportMentor(user:any){
    this.navCtrl.push(ReportPage,{user:user});
    this.viewCtrl.dismiss();

  }

  reportMentee(user:any){
    this.navCtrl.push(ReportPage,{user});
    this.viewCtrl.dismiss();
  }

  messagecoMentee(user: any)
  {
    this.navCtrl.push(SmscomenteePage, {user});
    this.viewCtrl.dismiss();
  }

  reportcoMentee(user:any){
    this.navCtrl.push(ReportPage,{user});
    this.viewCtrl.dismiss();
  }
}
