import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    constructor(private translateService: TranslateService) {}

    public changeLang(event: any) {
        this.translateService.use(event.target.value);
    }

  ngOnInit(): void {
  }

}
