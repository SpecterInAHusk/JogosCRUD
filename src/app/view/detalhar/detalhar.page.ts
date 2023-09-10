import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Jogo } from 'src/app/model/entities/Jogo';
import { JogoFirebaseService } from 'src/app/services/jogo-firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  jogo!: Jogo;
  nome!: string;
  dataLancamento!: number;
  genero!: string;
  numJogadores!: number;

  constructor(
    private alertcontroller: AlertController,
    private router: Router,
    private firebase: JogoFirebaseService
  ) {}

  ngOnInit() {
    this.jogo = history.state.jogo;
    this.nome = this.jogo.nome;
    this.dataLancamento = this.jogo.dataLancamento;
    this.genero = this.jogo.genero;
    this.numJogadores = this.jogo.numJogadores;
  }

  editar() {
    let novo: Jogo = new Jogo(this.nome, this.dataLancamento);
    novo.genero = this.genero;
    novo.numJogadores = this.numJogadores;
    this.router.navigate(['home']);
  }

  excluir() {
    this.firebase.deleteJogo(this.jogo.id);
    this.router.navigate(['home']);
  }
}
