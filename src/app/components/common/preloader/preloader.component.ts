import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

    constructor(private translateService: TranslateService) {}

    public changeLang(event: any) {
        this.translateService.use(event.target.value);
    }

  ngOnInit(): void {
  }

}
