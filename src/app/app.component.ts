import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, MenuController, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import {DashboardPage} from "../pages/dashboard/dashboard";
import {ProfilePage} from "../pages/profile/profile";
import {MymenteesPage} from "../pages/mymentees/mymentees";
import {GoalsPage} from "../pages/goals/goals";
import {SchedulePage} from "../pages/schedule/schedule";;
import {AchievementPage} from "../pages/achievement/achievement";
import {GoalrequestPage} from "../pages/goalrequest/goalrequest";
import {ComenteesPage} from "../pages/comentees/comentees";
import {CommunityService} from "../services/community";
import {RulesPage} from "../pages/rules/rules";
import {BackgroundMode} from "@ionic-native/background-mode";
import {ReportPage} from "../pages/report/report";
import {StartupPage} from "../pages/startup/startup";
import {CommunityPage} from "../pages/community/community";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  userType:number;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;
  //rootPage = StartupPage;
  rootPage = CommunityPage;
  //rootPage:any;
  profilePage = ProfilePage;
  goal = GoalsPage;
  schedule = SchedulePage;
  myMenteesPage = MymenteesPage;
  admin:number;
  mentorID = false;
  constructor(private menuCtrl: MenuController,
              private storage: Storage,
              private comService: CommunityService,
              private bgMode: BackgroundMode,
              private modalCtrl: ModalController,
              platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen) {
    this.bgMode.enable();
   // setInterval(() => {
   //    this.storage.get('token').then((token) => {
   //      if(token){
   //          this.isAuthenticated = true;
   //          this.rootPage = DashboardPage;
   //          this.storage.get('userType').then((type) => {
   //            this.userType = type;
   //            this.storage.get('admin').then((admin) => {this.admin = admin;});
   //            this.storage.get('mentorID').then((mentorID) => {
   //              if(mentorID){
   //                this.mentorID = true;
   //              }
   //            })
   //          });
   //        }else{
   //          this.isAuthenticated = false;
   //          this.rootPage = HomePage;
   //        }
   //    });
   //  },1);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // ionViewCanEnter(){
  //   this.storage.get('token').then((token) => {
  //     if(token){
  //       this.bgMode.enable();
  //       this.isAuthenticated = false;
  //       this.rootPage = DashboardPage;
  //     }else{
  //       this.isAuthenticated = false;
  //       this.rootPage = HomePage;
  //     }
  //   });
  // }

  ionViewDidEnter(){
  }

  logout(){
    this.isAuthenticated = false;
    this.storage.set('token','');
    this.storage.set('user_id','');
    this.storage.set('userType','');
    this.storage.set('user_details','');
    this.storage.set('mentorID','');
    this.storage.set('careerfield','');
    this.comService.emptyArray();
    this.nav.setRoot(HomePage);
    this.menuCtrl.close();

  }

  onMentee(){
    this.nav.push(MymenteesPage);
    this.menuCtrl.close();
  }

  onprofile()
  {
    this.nav.push(ProfilePage);
    this.menuCtrl.close();
  }

  ongoals(){
    this.nav.push(GoalsPage);
    this.menuCtrl.close();
  }

  onschedule()
  {
    this.nav.push(SchedulePage);
    this.menuCtrl.close();
  }

  onAchievement(){
    this.nav.push(AchievementPage);
    this.menuCtrl.close();
  }

  onGoalRequest(){
      this.nav.push(GoalrequestPage);
      this.menuCtrl.close();
  }

  onRules(){
    this.nav.push(RulesPage);
    this.menuCtrl.close();
  }
  onCoMentee(){
    this.nav.push(ComenteesPage);
    this.menuCtrl.close();
  }

}

