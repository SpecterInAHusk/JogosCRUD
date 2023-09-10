import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Jogo } from 'src/app/model/entities/Jogo';
import { JogoFirebaseService } from 'src/app/services/jogo-firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  nome!: string;
  dataLancamento!: number;
  genero!: string;
  numJogadores!: number;

  constructor(
    private alertcontroller: AlertController,
    private router: Router,
    private firebase: JogoFirebaseService
  ) {}

  ngOnInit() {}

  cadastrar() {
    if (!this.nome || !this.dataLancamento) {
      this.presentAlert('Erro!', 'Nome e data de lançamento são obrigatórios!');
    } else {
      this.presentAlert('Sucesso!', 'Jogo cadastrado com sucesso!');
      let novo: Jogo = new Jogo(this.nome, this.dataLancamento);
      novo.genero = this.genero;
      novo.numJogadores = this.numJogadores;
      this.firebase.addJogo(novo);
      this.router.navigate(['home'])
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertcontroller.create({
      header: 'Cadastro de Jogo',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
