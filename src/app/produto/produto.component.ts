import { Component } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent {
  fotos: string[] = [
    '../../assets/image-secundaria.png',
    '../../assets/image-secundaria-2.png',
    '../../assets/image-produto-secundaria-3.png',
  ];

  fotoPrincipal: string = '../../assets/image-produto-principal.png';

  mudarFotoPrincipal(indexFoto: number) {
    const aux = this.fotoPrincipal;
    this.fotoPrincipal = this.fotos[indexFoto];
    this.fotos[indexFoto] = aux;
  }
}
