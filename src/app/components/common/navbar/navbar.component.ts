import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";
import { QuesttypeService } from "src/app/services/questtype.service";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
    public langNumber = 1;
    constructor(private translateService: TranslateService, private questTypeService : QuesttypeService) {}

    // public langNav$ = new BehaviorSubject<number>(null);


    ngOnInit(): void {
        this.questTypeService.getQuestTypes(this.langNumber);
    }

    changeLang(event: any) {
        this.translateService.use(event.target.value);
        console.log('lang', event.target.value);
        if(event.target.value == 'en-US'){
            this.langNumber = 0;
            // this.langNav$.next(0);
            this.questTypeService.getQuestTypes(this.langNumber);
        }else{
            this.langNumber = 1;
            // this.langNav$.next(1);
            this.questTypeService.getQuestTypes(this.langNumber);
        }
    }
}
