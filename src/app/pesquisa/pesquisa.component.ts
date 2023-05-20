import { Component } from '@angular/core';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css'],
})
export class PesquisaComponent {
  numeroIteracoes: number = 10;

  criarIteracoes(numero: number): number[] {
    return Array.from({ length: numero });
  }
}
