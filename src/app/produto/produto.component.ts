import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ofertas } from '../ofertas.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent implements OnInit {
  fotos: string[] = [];
  fotoPrincipal: string = '';
  key: string | null = '';
  produto: any;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private ofertas: Ofertas) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((params) => (this.key = params.get('key')));
    this.ofertas.RetornaOferta(this.key).then((response) => {
      this.produto = response;
      console.log(this.produto);
      this.fotos = this.produto[0].url.slice(1, 4);
      this.fotoPrincipal = this.produto[0].url[0];
      this.isLoading = false;
    });
  }

  mudarFotoPrincipal(indexFoto: number) {
    const aux = this.fotoPrincipal;
    this.fotoPrincipal = this.fotos[indexFoto];
    this.fotos[indexFoto] = aux;
  }
}
