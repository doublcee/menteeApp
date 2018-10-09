import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController, LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-goalrequestdetails',
  templateUrl: 'goalrequestdetails.html',
})
export class GoalrequestdetailsPage implements OnInit{
  details: any = [];
  imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadCtrl: LoadingController) {
  }

  ngOnInit(){
    console.log(this.navParams.data);
    this.details = this.navParams.data;
  }

  onClose(){
    this.viewCtrl.dismiss();
  }

}
