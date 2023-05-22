import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  principaisProdutos: any;
  eletronicos: any;
  constructor(private produtos: ProdutosService) {}

  ngOnInit(): void {
    this.produtos.consultarProdutosporpagina(1, 6).then((produtos) => {
      this.principaisProdutos = produtos;
      console.log(this.principaisProdutos);
    });
    this.produtos
      .consultarProdutosPorCategoria('eletronicos')
      .then((produtos) => (this.eletronicos = produtos.slice(0, 6)));
  }
}
