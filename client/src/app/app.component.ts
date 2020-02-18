import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('navBurger', { static: true }) navBurger: ElementRef;
  @ViewChild('navMenu', { static: true }) navMenu: ElementRef;

  shutNavMobile() {
    this.navBurger.nativeElement.classList.remove('is-active');
    this.navMenu.nativeElement.classList.remove('is-active');
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }
}