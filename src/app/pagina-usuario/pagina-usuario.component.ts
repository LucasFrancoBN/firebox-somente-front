import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Favoritos } from '../favoritos.service';
import { Produto } from '../produtos.service';
import { Ofertas } from '../ofertas.service';
import { Autenticacao } from '../autenticacao.service';

@Component({
  selector: 'app-pagina-usuario',
  templateUrl: './pagina-usuario.component.html',
  styleUrls: ['./pagina-usuario.component.css'],
})
export class PaginaUsuarioComponent implements OnInit {
  produtosCriados: any;
  email: any;
  dadosUsuarios: any;
  favoritados: any;

  constructor(
    private produtos: Produto,
    private favoritos: Favoritos,
    private Oferta: Ofertas,
    private autenticacao: Autenticacao
  ) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user: any) => {
      console.log(user);
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
        this.produtos.acessarDadosUsuario(this.email).then((dadosUsuarios) => {
          this.dadosUsuarios = dadosUsuarios;
          console.log(dadosUsuarios);
        });
        this.favoritos.consultarFavoritados(this.email).then((response) => {
          this.favoritados = response;
          console.log(this.favoritados);
        });
      }
    });
  }

  async excluirProduto(produto: any) {
    await this.produtos.DeletarProduto(produto).then((response) => {
      window.alert('Produto deletado com sucesso');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  async ApagarConta() {
    try {
      await this.autenticacao.DeletarUsuarioBD(this.email);
      await this.ApagarTudo(this.email);
      await this.autenticacao.desativarConta();
      await Promise.all([this.autenticacao.sair()]);
    } catch (error) {
      console.log(error);
    }
  }

  public async ApagarTudo(email: any) {
    this.produtos.DeletarProduto(email).then(() => {});
  }
}
