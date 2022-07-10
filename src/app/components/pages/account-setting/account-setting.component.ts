import { Component, OnInit, ElementRef, Renderer2  } from '@angular/core';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent implements OnInit {

  constructor(private el: ElementRef,private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  changeStatus(){
    // let tag = this.el.nativeElement.getElementsByClassName("discover");
    // tag.classList?.remove("is-active");
    // console.log('tag' ,tag);

    this.renderer.removeClass(this.el.nativeElement, "is-active")
  }
}
