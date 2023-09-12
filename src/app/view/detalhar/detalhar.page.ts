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
  plataforma!: string;

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
    this.plataforma = this.jogo.plataforma;
    this.numJogadores = this.jogo.numJogadores;
  }

  editar() {
    if (!this.nome || !this.dataLancamento || !this.genero || !this.plataforma || !this.numJogadores) {
      this.presentAlert('Erro!', 'Todos os campos são obrigatórios!');
    } else {
      this.presentAlert('Sucesso!', 'Dados alterados com sucesso!');
      let novo: Jogo = new Jogo(this.nome, this.dataLancamento);
      novo.genero = this.genero;
      novo.plataforma = this.plataforma;
      novo.numJogadores = this.numJogadores;
      this.firebase.editJogo(novo, this.jogo.id);
      this.router.navigate(['home']);
    }
  }

  excluir() {
    this.presentAlert('Sucesso!', 'Exclusão realizada com sucesso!');
    this.firebase.deleteJogo(this.jogo.id);
    this.router.navigate(['home']);
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertcontroller.create({
      header: 'Edição de Jogo',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async alertDeleteConfirm() {
    const alert = await this.alertcontroller.create({
      header: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },

        {
          text: 'Confirmar',
          handler: () => {
            this.excluir();
          },
        },
      ],
    });

    await alert.present();
  }
}
