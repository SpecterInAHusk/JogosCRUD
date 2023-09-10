import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Jogo } from 'src/app/model/entities/Jogo';
import { JogoFirebaseService } from 'src/app/services/jogo-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaJogos: Jogo[] = [];

  constructor(private router: Router, private firebase: JogoFirebaseService) {
    this.firebase.getAllJogos().subscribe((res) => {
      this.listaJogos = res.map((jogo) => {
        return {
          id: jogo.payload.doc.id,
          ...(jogo.payload.doc.data() as any),
        } as Jogo;
      });
    });
  }

  navegarCadastro() {
    this.router.navigate(['cadastrar']);
  }

  editarJogo(jogo: Jogo) {
    this.router.navigateByUrl('detalhar', { state: { jogo: jogo } });
  }
}
