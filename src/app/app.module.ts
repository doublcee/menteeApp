import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {MenteeSignupPage} from "../pages/mentee-signup/mentee-signup";
import {MentorSignupPage} from "../pages/mentor-signup/mentor-signup";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../services/auth";
import {IonicStorageModule} from "@ionic/storage";
import {ProfilePage} from "../pages/profile/profile";
import {CommunityPage} from "../pages/community/community";
import {MessagesPage} from "../pages/messages/messages";
import {MessagementorPage} from "../pages/messagementor/messagementor";
import {EditprofilePage} from "../pages/editprofile/editprofile";
import {MessagePage} from "../pages/message/message";
import {MentordetailsPage} from "../pages/mentordetails/mentordetails";
import {MymentorPage} from "../pages/mymentor/mymentor";
import {MenteeRequestPage} from "../pages/mentee-request/mentee-request";
import {MenteedetailsPage} from "../pages/menteedetails/menteedetails";
import {MymenteesPage} from "../pages/mymentees/mymentees";
import {MessagementeePage} from "../pages/messagementee/messagementee";
import {SentMessagePage} from "../pages/sent-message/sent-message";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {ImageuploadPage} from "../pages/imageupload/imageupload";
import {Transfer} from "@ionic-native/transfer";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {MenteeinfoPage} from "../pages/menteeinfo/menteeinfo";
import {CommunityService} from "../services/community";
import {GoalsPage} from "../pages/goals/goals";
import {AddgoalPage} from "../pages/addgoal/addgoal";
import {SchedulePage} from "../pages/schedule/schedule";
import {GoalService} from "../services/goal";
import {AchievementPage} from "../pages/achievement/achievement";
import {GoalrequestPage} from "../pages/goalrequest/goalrequest";
import {GoalrequestdetailsPage} from "../pages/goalrequestdetails/goalrequestdetails";
import {ForgotpasswordPage} from "../pages/forgotpassword/forgotpassword";
import {AllmentorsPage} from "../pages/allmentors/allmentors";
import {AllmenteesPage} from "../pages/allmentees/allmentees";
import {MentorinfoPage} from "../pages/mentorinfo/mentorinfo";
import {ComenteesPage} from "../pages/comentees/comentees";
import {ComenteedetailPage} from "../pages/comenteedetail/comenteedetail";
import {SmscomenteePage} from "../pages/smscomentee/smscomentee";
import {ViewphotoPage} from "../pages/viewphoto/viewphoto";
import {SmenteeinfoPage} from "../pages/smenteeinfo/smenteeinfo";
import {SmentorinfoPage} from "../pages/smentorinfo/smentorinfo";
import {UnappmenteesPage} from "../pages/unappmentees/unappmentees";
import {UnappmentorsPage} from "../pages/unappmentors/unappmentors";
import {SmenteedetailsPage} from "../pages/smenteedetails/smenteedetails";
import {PopoverPage} from "../pages/popover/popover";
import {ReportPage} from "../pages/report/report";
import {AllreportPage} from "../pages/allreport/allreport";
import {ViewreportPage} from "../pages/viewreport/viewreport";
import {RulesPage} from "../pages/rules/rules";
import {Keyboard} from "@ionic-native/keyboard";
import {BackgroundMode} from "@ionic-native/background-mode";
import {StartupPage} from "../pages/startup/startup";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenteeSignupPage,
    MentorSignupPage,
    DashboardPage,
    ProfilePage,
    CommunityPage,
    MessagesPage,
    MessagementorPage,
    EditprofilePage,
    MessagePage,
    MentordetailsPage,
    MymentorPage,
    MenteeRequestPage,
    MenteedetailsPage,
    MymenteesPage,
    MessagementeePage,
    SentMessagePage,
    ImageuploadPage,
    MenteeinfoPage,
    GoalsPage,
    AddgoalPage,
    SchedulePage,
    AchievementPage,
    GoalrequestPage,
    GoalrequestdetailsPage,
    ForgotpasswordPage,
    AllmentorsPage,
    AllmenteesPage,
    MentorinfoPage,
    ComenteesPage,
    ComenteedetailPage,
    SmscomenteePage,
    ViewphotoPage,
    SmenteeinfoPage,
    SmentorinfoPage,
    UnappmenteesPage,
    UnappmentorsPage,
    SmenteedetailsPage,
    PopoverPage,
    ReportPage,
    AllreportPage,
    ViewreportPage,
    RulesPage,
    StartupPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MentorSignupPage,
    MenteeSignupPage,
    DashboardPage,
    ProfilePage,
    CommunityPage,
    MessagesPage,
    MessagementorPage,
    EditprofilePage,
    MessagePage,
    MentordetailsPage,
    MymentorPage,
    MenteeRequestPage,
    MenteedetailsPage,
    MymenteesPage,
    MessagementeePage,
    SentMessagePage,
    ImageuploadPage,
    MenteeinfoPage,
    GoalsPage,
    AddgoalPage,
    SchedulePage,
    AchievementPage,
    GoalrequestPage,
    GoalrequestdetailsPage,
    ForgotpasswordPage,
    AllmentorsPage,
    AllmenteesPage,
    MentorinfoPage,
    ComenteesPage,
    ComenteedetailPage,
    SmscomenteePage,
    ViewphotoPage,
    SmenteeinfoPage,
    SmentorinfoPage,
    UnappmenteesPage,
    UnappmentorsPage,
    SmenteedetailsPage,
    PopoverPage,
    ReportPage,
    AllreportPage,
    ViewreportPage,
    RulesPage,
    StartupPage
  ],
  providers: [
    Camera,
    Transfer,
    FilePath,
    File,
    InAppBrowser,
    StatusBar,
    SplashScreen,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
      AuthService, CommunityService, GoalService
  ]
})
export class AppModule {}
