import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css'],
})
export class CadastrarProdutoComponent implements OnInit {
  public email: any;
  maxFiles = 4;
  fileCount = 0;
  files: any[] = [];

  public imagem: any;
  public imagem2: any;
  public imagem3: any;
  public imagem4: any;

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null),
    categoria: new FormControl(null),
    valor: new FormControl(null),
  });

  constructor(private produto: ProdutosService) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        this.email = user.email;
        console.log(user);
      }
    });
  }

  // função que manda os dados para o serviço de publicação
  public publicar() {
    console.log(this.imagem[0], this.imagem[1], this.imagem[2], this.imagem[3]);
    this.produto
      .publicar({
        email: this.email,
        titulo: this.formulario.value.titulo,
        categoria: this.formulario.value.categoria,
        valor: this.formulario.value.valor,
        imagem: this.imagem[0] ? this.imagem[0] : '',
        nome_usuario: this.produto.acessarDadosUsuarioDetalhe(this.email),
      })
      .then(() => {
        this.produto.publicar2({
          email: this.email,
          titulo: this.formulario.value.titulo,
          categoria: this.formulario.value.categoria,
          valor: this.formulario.value.valor,
          imagem2: this.imagem[1] ? this.imagem[1] : '',
        });
      })
      .then(() => {
        this.produto.publicar3({
          email: this.email,
          titulo: this.formulario.value.titulo,
          categoria: this.formulario.value.categoria,
          valor: this.formulario.value.valor,
          imagem3: this.imagem[2] ? this.imagem[2] : '',
        });
      })
      .then(() => {
        this.produto.publicar4({
          email: this.email,
          titulo: this.formulario.value.titulo,
          categoria: this.formulario.value.categoria,
          valor: this.formulario.value.valor,
          imagem4: this.imagem[3] ? this.imagem[3] : '',
        });
      });
  }

  onFileChange(event: any) {
    this.fileCount = event.target.files.length;
    if (this.fileCount > this.maxFiles) {
      alert(`Por favor, selecione no máximo ${this.maxFiles} arquivos.`);
      event.target.value = '';
    } else {
      this.files = [];
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        if (i >= this.maxFiles) {
          break;
        }
        if (i === 0) {
          this.imagem = (<HTMLInputElement>event.target).files;
        } else if (i === 1) {
          this.imagem2 = (<HTMLInputElement>event.target).files;
        } else if (i === 2) {
          (<HTMLInputElement>event.target).files;
        } else if (i === 3) {
          (<HTMLInputElement>event.target).files;
        }
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.files.push({ name: file.name, url: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  exibirImagens(event: any) {
    this.files = [];
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (i >= this.maxFiles) {
        break;
      }
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.files.push({ name: file.name, url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
