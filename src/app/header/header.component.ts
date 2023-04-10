import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() showHome!: boolean;
  menuMobileIsOpen = true;

  menuMobile() {
    this.menuMobileIsOpen = !this.menuMobileIsOpen;
  }
}
