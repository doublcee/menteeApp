import { Component } from '@angular/core';
import {
  NavController, NavParams, ActionSheetController, Platform, ToastController,
  LoadingController, AlertController
} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {Transfer, TransferObject, FileUploadOptions} from "@ionic-native/transfer";
import {FilePath} from "@ionic-native/file-path";
import { Storage } from "@ionic/storage";
import {DashboardPage} from "../dashboard/dashboard";

declare let cordova: any;

@Component({
  selector: 'page-imageupload',
  templateUrl: 'imageupload.html',
})
export class ImageuploadPage{
  lastImage: string = null;
  loading: any;
  userID: number;
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private filePath: FilePath,
              private file: File,
              private loadCtrl: LoadingController,
              private platform: Platform,
              private transfer: Transfer,
              private toastCtrl: ToastController,
              private storage: Storage) {
    this.storage.get('user_id').then((id) => {
      this.userID = id;
    })
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    let options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
            .then(filePath => {
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
   private createFileName() {
     var d = new Date(),
         n = d.getTime(),
         newFileName =  n + ".jpg";
     return newFileName;
  }

// Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    try{
      this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
        this.lastImage = newFileName;
      },error => {
        console.log(error);
        this.presentToast('Error while storing file.');
      });
    }catch(err){
      console.log(err);
    }
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(userID:number) {
    // Destination URL
   let url = "http://10.0.2.2:8000/api/uploadImage";
   // let url = 'http://pursuitofpurposenetwork.com/mobileApp/api/uploadImage';

    // File for Upload
    let targetPath = this.pathForImage(this.lastImage);

    // File name only
    let filename = this.lastImage;
    let options:  FileUploadOptions = {
      fileKey: "file",
      fileName: filename,
      mimeType: "multipart/form-data",
      params : {'fileName': filename, 'userID': this.userID}
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadCtrl.create({
      spinner: 'dots',
      content: 'Uploading...'
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      targetPath = null;
      this.lastImage = null;
      this.loading.dismiss();
    //  document.getElementById('imageclass').innerHTML = JSON.stringify(data);
      if(data['response'] == "success"){
        this.navCtrl.setRoot(DashboardPage);
      }
      this.presentToast('Image successfully uploaded.');
    },(err) => {
      targetPath = null;
      this.lastImage = null;
      this.loading.dismiss();
      if(err['http_status'] == 500){
        this.popAlert('Image file too large. please select image not higher than 2MB of size','Upload Error!');
       // document.getElementById('imageclass').innerHTML = JSON.stringify(err);
      }else{
       //ocument.getElementById('imageclass').innerHTML = JSON.stringify(err);
        this.presentToast('Error while uploading file.');
      }
    });
  }

  popAlert(message:string,title:string){
    let alert = this.alertCtrl.create({
       title: title,
       message:message,
       buttons: ['OK']
    });
    alert.present();
  }
}
