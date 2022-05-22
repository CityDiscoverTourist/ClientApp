import { Component, OnInit } from '@angular/core';
// Custome
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {

  constructor(private fb: FacebookService) {
    const initParams: InitParams = {
        appId: '242788142556987',
        xfbml: true,
        version: 'v2.8'
      };

      this.fb.init(initParams);

  }

  ngOnInit(): void {
    // this.initFacebookService();
  }

//   private initFacebookService(): void {
//     const initParams: InitParams = { xfbml:true, version:'v3.2'};
//     this.facebookService.init(initParams);
//   }



}
