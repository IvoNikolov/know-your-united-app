import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

interface Player {
  id?: string;
  firstName: string;
  lastName: string;
  number: number;
  nationality: string;
  position: string;
}

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.page.html',
  styleUrls: ['./player-details.page.scss'],
})
export class PlayerDetailsPage implements OnInit, OnDestroy{

  playerForm: FormGroup;

  players: Player[];
  isAllowedToRemove: boolean;
  isLoading = true;

  subscription: Subscription;

  constructor(public playerService: PlayerService, public router: Router, private alertCtrl: AlertController) {}

  ngOnInit() {
    console.log('enter');
    this.subscription = this.playerService.getPlayers().subscribe((data: any) => {
      this.isLoading = true;
      this.players = [];
      this.players = data.sort((player1: Player, player2: Player) => {
        return player1.number - player2.number;
      });
      this.isLoading = false;
    });
  }

  updatePlayer(id: string) {
    this.router.navigate(['../add-player', id]);
  }

  removePlayer(id: string) {
    this.getAlert(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('leave');
  }

  navTo() {
    this.router.navigate(['../add-player']);
  }

  private getAlert(id: string) {

    this.alertCtrl.create({
      header: 'Remove player',
      message: 'Are you sure you want to remove this player?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
              this.isLoading = true;
              this.playerService.removePlayer(id).then(() => {
                this.isLoading = false;
                console.log('finished deleting');
              }).catch(err => {
                console.log('Error occured');
                this.isLoading = false;
              });
          }
        },
        {
          text: 'No'
        }
      ]
    }).then(alert => {
      alert.present();
    });
 }
}
