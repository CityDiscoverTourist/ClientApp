import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private translateService: TranslateService) {}

  public changeLang(event: any) {
      this.translateService.use(event.target.value);
  }

  ngOnInit(): void {
  }

}
