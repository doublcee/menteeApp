import { Component } from '@angular/core';
import {
    NavController, NavParams, LoadingController, ModalController, ToastController,
    ItemSliding, AlertController
} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {Storage} from '@ionic/storage';
import {SmenteedetailsPage} from "../smenteedetails/smenteedetails";


@Component({
  selector: 'page-unappmentees',
  templateUrl: 'unappmentees.html',
})
export class UnappmenteesPage {
 mentees: any;
    imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private loadCtrl: LoadingController,
              private storage: Storage,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController,
               private alertCtrl: AlertController) {
  }

  ionViewCanEnter() {
    let loader = this.loadCtrl.create({spinner:'dots',content:''});
    loader.present();
    this.storage.get('token').then((token) => {
      this.authService.unapprovedMentees(token)
          .subscribe((data) => {
            loader.dismissAll();
            this.mentees = data;
          },() => {
            loader.dismissAll();
              return this.toast('unable to connect. connection lost');
            //
          });
    })
  }

  onMentee(mentee:any){
      let modal = this.modalCtrl.create(SmenteedetailsPage,{mentee:mentee});
      modal.present();
  }

    onApprove(user:number, index:number,itemSliding:ItemSliding,name:string){
        itemSliding.close();
        this.storage.get('token').then((token) => {
            let alert = this.alertCtrl.create({
                message: 'Approve '+name+' request ?',
                buttons: [{
                    text: 'Ok',
                    handler: () => {
                        console.log(user,index);
                        let loader = this.loadCtrl.create({spinner:'dots',content:'Processing.. please wait!'});
                        loader.present();
                        this.authService.approveAccount(user,token)
                            .subscribe((data) => {
                                loader.dismissAll();
                                if(data['success']){
                                    this.toast(data['success']);
                                    this.mentees.splice(index, 1);
                                    return this.mentees;
                                }
                            },(err) => {
                                loader.dismissAll();
                                console.log(err);
                            })
                    }
                },{
                    text: 'Cancel',
                    role: 'cancel',
                }]

            });

            alert.present();
        });


    }

    onDelete(user:number, index:number, itemSliding:ItemSliding,name:string){
        itemSliding.close();
        this.storage.get('token').then((token) => {
            let alert = this.alertCtrl.create({
                message: 'Delete '+name+' request ?',
                buttons: [{
                    text: 'Ok',
                    handler: () => {
                        console.log(user,index);
                        let loader = this.loadCtrl.create({spinner:'dots',content:'Processing.. please wait!'});
                        loader.present();
                        this.authService.deleteAccount(user,token)
                            .subscribe((data) => {
                                loader.dismissAll();
                                if(data['success']){
                                    this.toast(data['success']);
                                    this.mentees.splice(index, 1);
                                    return this.mentees;
                                }
                            },(err) => {
                                loader.dismissAll();
                                console.log(err);
                            })
                    }
                },{
                    text: 'Cancel',
                    role: 'cancel',
                }]

            });

            alert.present();
        });

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
