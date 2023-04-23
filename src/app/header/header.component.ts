import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Autenticacao } from '../autenticacao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() showHome!: boolean;
  menuMobileIsOpen = true;
  estadoLogin = false;

  constructor(private autenticacao: Autenticacao) {}

  ngOnInit() {
    console.log('Passou :D');
  }

  estaLogado() {
    const token = window.localStorage.getItem('id_token');
    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    this.autenticacao.sair();
  }

  menuMobile() {
    this.menuMobileIsOpen = !this.menuMobileIsOpen;
  }
}
