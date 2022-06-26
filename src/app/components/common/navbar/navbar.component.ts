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
    public langNumber;
    public langfixed;
    constructor(private translateService: TranslateService, private questTypeService : QuesttypeService) {}

    // public langNav$ = new BehaviorSubject<number>(null);


    ngOnInit(): void {
        this.langNumber = Number(localStorage.getItem('lang') || 1);
        this.questTypeService.getQuestTypes(this.langNumber);
        this.langfixed = localStorage.getItem('fixedlang') || '1';
        this.translateService.use(this.langfixed);

    }

    changeLang(event: any) {
        // console.log('lang', event.target.value);
        if(event.target.value == 'en-US'){
            this.langNumber = 0;
            this.questTypeService.getQuestTypes(this.langNumber);
        }else if(event.target.value == 'vi-VN'){
            this.langNumber = 1;
            this.questTypeService.getQuestTypes(this.langNumber);
        }
        localStorage.setItem('lang', String(this.langNumber));
        this.langfixed = event.target.value;
        localStorage.setItem('fixedlang', this.langfixed);
        // reload
        window.location.reload();

    }
}
