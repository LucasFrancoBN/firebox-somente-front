import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Autenticacao } from '../autenticacao.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() showHome!: boolean;
  menuMobileIsOpen = false;
  estadoLogin = false;

  public formulario: FormGroup = new FormGroup({
    pesquisa: new FormControl(null),
  });

  constructor(
    private autenticacao: Autenticacao,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}

  pesquisar() {
    if (this.location.path().includes('/pesquisa/')) {
      // window.location.reload();
      this.router.navigateByUrl('/pesquisa/' + this.formulario.value.pesquisa);
    } else {
      this.router.navigateByUrl('/pesquisa/' + this.formulario.value.pesquisa);
    }
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
