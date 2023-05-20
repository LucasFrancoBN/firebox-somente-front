import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-pagina-usuario',
  templateUrl: './pagina-usuario.component.html',
  styleUrls: ['./pagina-usuario.component.css'],
})
export class PaginaUsuarioComponent implements OnInit {
  produtosCriados: any;
  email: any;

  constructor(private produtos: ProdutosService) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        this.email = user.email;
        console.log(user);
        this.produtos
          .consultarProdutosPorusuario(this.email)
          .then((produtos) => {
            this.produtosCriados = produtos;
            console.log(this.produtosCriados, produtos);
          })
          .catch((error) => console.log(error));
        console.log(this.produtosCriados);
      }
    });
  }
}
