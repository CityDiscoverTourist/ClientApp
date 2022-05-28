import { Component, OnInit } from '@angular/core';

// Icons:
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faWandMagic } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
    faStar = faStar;
    faLocationDot = faLocationDot;
    faWandMagic = faWandMagic;
    faPlus = faPlus;
    faMinus = faMinus;
    faClipboardList = faClipboardList;
    faRoad = faRoad;
    faTag = faTag;
    faClock = faClock;
    faCheck = faCheck;
    faAward = faAward;
    faHourglassStart = faHourglassStart;

    constructor(private translateService: TranslateService) {}

    public changeLang(event: any) {
        this.translateService.use(event.target.value);
    }

  ngOnInit(): void {
  }

  public quantity:number = 1;
  public price:number = 100000;
  public total:number = this.price;

  public count_quantity(func:string){
      if(func === '+'){
        this.quantity++;
        this.total = this.quantity * this.price;
      }else{
        if(this.quantity !== 1){
            this.quantity--;
            this.total = this.quantity * this.price;
        }
      }
  }

}
