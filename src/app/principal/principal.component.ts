import { Component } from '@angular/core';
import { ClienteService } from '../servico/cliente.service';
import { Cliente } from '../models/cliente.module';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-principal',
  imports: [FormsModule, NgIf],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  //Objeto do tipo cliente
  cliente = new Cliente();

  //Variavel para visibilidade dos botoes
  btnCadastro:boolean = true;

  //Variavel para visibilidade da table
  tabela:boolean = true;

  //JSON de clientes
  clientes:Cliente[] = [];

  //Construtor
  constructor(private servico:ClienteService){}

  //Método de seleção
  selecionar():void {
    this.servico.selecionar()
    .subscribe(retorno  => this.clientes = retorno);
  }

  cadastrar():void {
    this.servico.cadatrar(this.cliente)
    .subscribe(
      retorno => {
        this.selecionar()
        this.cliente = new Cliente();
        alert('Cliente cadastrado com sucesso!');
      }
    );
  }

  // Método para selecionar um cliente específico
  selecionarCliente(codigo:number):void{
    const clienteEncontrado = this.clientes.find(c => c.codigo === codigo);
    if (clienteEncontrado) {
      this.cliente = clienteEncontrado;
    }

    this.btnCadastro = false;
    this.tabela = false;
  }

  //Método para editar clientes
  editar():void{
    this.servico.editar(this.cliente)
    .subscribe(
      retorno => {
        let posicao = this.clientes.findIndex(c => {
          return c.codigo == retorno.codigo;
        });
        this.clientes[posicao] = retorno;

        this.cliente = new Cliente();

        //Visibiliade dos botoes
        this.btnCadastro = true;

        //Visibilidade da tabela
        this.tabela = true;
        alert('Cliente alterado com sucesso!');

      }
    );
  }

  remover():void{
    this.servico.remover(this.cliente.codigo)
    .subscribe(
      retorno => {
        let posicao = this.clientes.findIndex(c => {
          return c.codigo == this.cliente.codigo;
        });
        this.clientes.splice(posicao, 1);

        this.cliente = new Cliente();

        //Visibiliade dos botoes
        this.btnCadastro = true;

        //Visibilidade da tabela
        this.tabela = true;
        alert('Cliente removido com sucesso!');
      }
    );
  }

  cancelar():void {
    this.btnCadastro = true;
    this.tabela = true;
    this.cliente = new Cliente();
  }


  //Método de inicialização
  ngOnInit() {
    this.selecionar();
  }

}
