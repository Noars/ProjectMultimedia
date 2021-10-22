import { Injectable } from '@angular/core';

declare var initDeezer: any;
declare var initStatusDeezer: any;
declare var getStatusDeezer: any;

@Injectable({
  providedIn: 'root'
})
export class LoginNotificationService {

  logOnDeezer = false;
  statusDeezer;

  logOnSpotify = false;
  statusSpotify;

  constructor() {
    this.getStatusDeezer();
    this.getStatusSpotify();
  }

  getStatusDeezer(){
    initDeezer();
    initStatusDeezer();
    this.statusDeezer = getStatusDeezer();
    setTimeout(() => {
      if (this.statusDeezer != 'connected' && this.statusDeezer !=  'notConnected' && this.statusDeezer !=  'unknown' &&  this.statusDeezer != 'not_authorized'){
        this.getStatusDeezer();
      }else {
        this.updateStatusDeezer();
      }
    }, 1000);
  }

  updateStatusDeezer(){
    if (this.statusDeezer == 'notConnected' || 'unknown' || 'not_authorized'){
      this.logOnDeezer = false;
    }else if (this.statusDeezer == 'connected'){
      this.logOnDeezer = true;
    }
  }

  getStatusSpotify(){
    this.statusSpotify = location.href;
    this.logOnSpotify = this.statusSpotify.includes('access_token');
    console.log('Status Spotify : ', this.logOnSpotify);
  }

}