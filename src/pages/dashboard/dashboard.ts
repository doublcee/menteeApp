import  {Component} from '@angular/core';
import {NavController, ToastController, LoadingController, ModalController} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import { Storage } from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {CommunityPage} from "../community/community";
import {MessagesPage} from "../messages/messages";
import {MymentorPage} from "../mymentor/mymentor";
import {MenteeRequestPage} from "../mentee-request/mentee-request";
import {InAppBrowser, InAppBrowserOptions}from '@ionic-native/in-app-browser'
import {AchievementPage} from "../achievement/achievement";
import {AllmentorsPage} from "../allmentors/allmentors";
import {AllmenteesPage} from "../allmentees/allmentees";
import {GoalrequestPage} from "../goalrequest/goalrequest";
import {CommunityService} from "../../services/community";
import {ViewphotoPage} from "../viewphoto/viewphoto";
import {UnappmenteesPage} from "../unappmentees/unappmentees";
import {UnappmentorsPage} from "../unappmentors/unappmentors";
import {AllreportPage} from "../allreport/allreport";
import {ImageuploadPage} from "../imageupload/imageupload";
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage{

  requestinfo:any;
  mentors: any;
  mentees: any;
  requests: any;
  reports: any;
  url:  string;
  userinfo: any = [];
  mentorinfo: any  = [];
  communityPage = CommunityPage;
  messagePage = MessagesPage;
  myMentorPage = MymentorPage;
  menteeRequestPage = MenteeRequestPage;
  achievementPage = AchievementPage;
  allmentorsPage = AllmentorsPage;
  allmenteesPage = AllmenteesPage;
  goalrequestPage = GoalrequestPage;
  messages:any;
  myID:any;
  userType: number;
  unappMentees: any;
  unappMentors: any;
  unappMenteesPage = UnappmenteesPage;
  unappMentorsPage = UnappmentorsPage;
  reportsPage = AllreportPage;
  //imageUrl: string = "http://localhost/MenteeAppBackend/public/uploads/";
   // imageUrl: string = "http://10.0.2.2/MenteeAppBackend/public/uploads/";
    imageUrl: string = 'http://pursuitofpurposenetwork.com/mobileApp/public/uploads/';
  constructor(public http: HttpClient,
              private navCtrl: NavController,
              private authService: AuthService,
              private storage: Storage,
              private toastCtrl: ToastController,
              private inAppBrowser: InAppBrowser,
              private loadCtrl: LoadingController,
              private comService: CommunityService,
              private modalCtrl: ModalController) {
  }

 ionViewCanEnter()
 {
   let loader = this.loadCtrl.create({spinner:'dots', content: ''});
   loader.present();
     this.storage.get('userType').then((userType) => {
         if(userType == 1){
             loader.dismissAll();
             return this.mentor();
         }else if(userType == 2){
             loader.dismissAll();
             return this.mentee();
         }else{
             loader.dismissAll();
             return this.superAdmin()
         }
     });
 }

 superAdmin(){
     this.getMentors();
     this.getMentees();
     this.unApprovedMentors();
     this.unApprovedMentees();
     this.getReports();
      this.goalRequests();
     this.storage.get('token').then((token) => {
        this.authService.issuperadmin(token)
             .subscribe(res => {
                 this.userinfo = res;
             },() => {
                 this.toast('unable to connect. connection lost');
             });
     });
 }


 mentor(){
     this.checkMessage();
     this.checkRequest();
     this.storage.get('user_id').then((id) => {
         this.getMessage(id);
         this.storage.get('token').then((token) => {
             this.authService.ismentor(token)
                 .subscribe(res => {
                     this.userinfo = res;
                 },() => {
                     this.toast('unable to connect. connection lost');
                 });
         });
     });

 }

 onUpload(){
     this.navCtrl.push(ImageuploadPage);
 }

 onView(photo:string){
   let modal = this.modalCtrl.create(ViewphotoPage,{photo: photo});
   modal.present();
 }

 mentee(){
     this.checkmentor();
     this.checkMessage();
         this.storage.get('token').then((token) => {
             this.authService.ismentee(token)
                 .subscribe(res => {
                     this.userinfo = res;
                 },() => {
                     this.toast('unable to connect. connection lost');
                 });
         })
 }
    checkmentor(){
      this.storage.get('user_id').then((id) => {
          this.storage.get('token').then((token) => {
            this.authService.verifyMentor(token,id)
                  .subscribe(data => {
                      this.mentorinfo = data;
                      if(data['reqStatus']){
                          this.storage.set('reqStatus', data['reqStatus']);
                      }
                      if(data['reqStatus'] == 3){
                          this.authService.getMentorID(id,token)
                              .subscribe((data) => {
                                  this.storage.set('mentorID', data['mentor']);
                                  this.getMessage(data['mentor']);
                              },() => {
                                //
                              });
                      }

                  },() => {
                      //
                  });
          });
      });
    }

    requestPend(){
        let toast = this.toastCtrl.create({
            message: 'you have a mentor request pending',
            duration: 1000,
            position: 'top'
        });
        toast.present();
    }

    checkMessage(){
        this.storage.get('token').then((token) => {
            this.storage.get('user_id').then((id) => {
                this.authService.checkUnreadMsg(id,token)
                    .subscribe(data => {
                        this.messages = data;
                    },() => {
                       //
                    })
            });
        });
    }

    onCommunity(){
        this.navCtrl.push(CommunityPage);
    }

    checkRequest()
    {
        this.storage.get('user_id').then((id) => {
            this.storage.get('token').then((token) => {
                this.authService.verifyRequest(token,id)
                    .subscribe(data => {
                        if(data['noRecord']){
                            //
                        }else{
                            this.requestinfo = data;
                        }
                    },() => {
                        //

                    });
            });

        });
    }

    gotoMessage(){
       this.navCtrl.push(MessagesPage);
        this.messages.splice(0);
        return this.messages;
    }

    gotoRequest()
    {
        this.navCtrl.push(MenteeRequestPage);
        this.requestinfo.splice(0);
        return this.requestinfo;
    }

    getMentors(){
        this.storage.get('token').then((token) => {
           this.authService.dashgetMentors(token)
                .subscribe(res => {
                    this.mentors = res;
                },() => {
                   //
                });
        });
    }

    getMentees(){
        this.storage.get('token').then((token) => {
           this.authService.dashgetMentees(token)
                .subscribe(res => {
                    this.mentees = res;
                },() => {
                   //
                });
        });
    }

    goalRequests(){
        this.storage.get('token').then((token) => {
           this.authService.dashgoalRequests(token)
                .subscribe((data) => {
                    this.requests = data;
                },() => {
                   //
                })
        });
    }

    getReports(){
        this.storage.get('token').then((token) => {
            this.authService.reportCounts(token)
                .subscribe((data) => {
                   this.reports = data
                },() => {
                 //
                });
        });
    }

    getMessage(comID:number){
        this.storage.get('token').then((token) => {
            this.comService.getMessages(comID,token)
                .subscribe((data) => {
                  this.comService.emptyArray();
                   this.comService.pushMessages(data);
                },() => {
                   //
                });
        });
    }

    pickMentor(){
        let loader = this.loadCtrl.create({spinner:'dots', content: 'Request in progress...'});
        loader.present();
        this.storage.get('token').then((token) => {
            this.storage.get('user_id').then((id) => {
                this.storage.get('careerfield').then((field) => {
                    this.authService.pickMentor(id,field,token)
                        .subscribe(data => {
                            loader.dismissAll();
                            if(data['success']){
                                this.navCtrl.setRoot(DashboardPage);
                                this.toast(data['success']);
                            }else if(data['fail']){
                                this.toast(data['fail']);
                            }else if(data['noMentor']){
                                this.toast(data['noMentor']);
                            }
                        },() => {
                            loader.dismissAll();
                           //
                        })
                });
            });
        });
    }

    unApprovedMentors(){
        this.storage.get('token').then((token) => {
            this.authService.unapprovedMentors(token)
                .subscribe((data) => {
                    this.unappMentors = data;
                },() => {
                    //
                });
        });
    }

    unApprovedMentees(){
        this.storage.get('token').then((token) => {
            this.authService.unapprovedMentees(token)
                .subscribe((data) => {
                    this.unappMentees = data;
                },() => {
                    //
                });
        });
    }



    scholarships()
    {
        const option1: InAppBrowserOptions = {
            zoom: 'no',
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };

        this.inAppBrowser.create('https://google.com/search?q=scholarships+in+my+location','_self', option1);
    }

    jobs()
    {
        const option2: InAppBrowserOptions = {
            zoom: 'no',
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };

        this.inAppBrowser.create('https://www.google.com/search?q=jobs+in+my+location','_self', option2);
    }

    blog()
    {
        const option3: InAppBrowserOptions = {
            zoom: 'no',
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };

        this.inAppBrowser.create('https://www.pursuitofpurposenetwork.com/','_self', option3);
    }
    toast(message:string){
        let toast = this.toastCtrl.create({
            message:message,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }
}