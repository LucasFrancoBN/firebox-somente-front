import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../produtos.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css'],
})
export class PesquisaComponent implements OnInit {
  numeroIteracoes: number = 10;
  caregorias: string[] = [
    'eletronicos',
    'moda-acessorios',
    'casa-decoracao',
    'automoveis',
    'esportes-lazer',
    'beleza-cuidados-pessoais',
    'livros-filmes-musica',
    'saude-bem-estar',
    'alimentos-bebidas',
    'outros',
  ];
  produtosPesquisados: any;
  isLoading: boolean = false;

  constructor(private produto: Produto, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    const param = this.route.snapshot.paramMap.get('pesquisa');
    this.produtosPesquisados = this.produto
      .Pesquisar(param!)
      .subscribe((produtos: any[]) => {
        this.produtosPesquisados = produtos;
        console.log(this.produtosPesquisados);
        this.isLoading = false;
      });
    console.log(this.produtosPesquisados);
  }

  criarIteracoes(numero: number): number[] {
    return Array.from({ length: numero });
  }
}
