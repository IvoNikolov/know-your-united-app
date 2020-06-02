import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
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
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit, OnDestroy {

  percent  = 0;
  radius = 100;
  fullTime = '00:01:30';
  title: any;

  timer: any;
  progress = 0;
  minutes = 1;
  seconds = 30;

  player: Player;
  players: Player[];
  playerNum: number;
  isGameStarted = false;
  inputValue: number;

  subscription: Subscription;

  points = 0;

  constructor(public playerService: PlayerService, public alertCtrl: AlertController) { }

  ngOnInit() {

  }

  ngOnDestroy() {}

  ionViewDidEnter() {
    console.log('enter');
    this.subscription = this.playerService.getPlayers().subscribe((data: any) => {
      this.players = data;
    });
  }

  ionViewDidLeave() {
    console.log('leave');
    this.subscription.unsubscribe();
  }

  startTimer() {

    this.startGame();

    clearInterval(this.timer);

    this.timer = setInterval(() => {

      if (this.percent < this.radius) {
        this.percent++;
        this.title = this.percent;
      } else if (this.percent === this.radius) {
        this.alertUser(this.points);
        this.percent = 0 ;
        this.title = this.percent;
        this.points = 0;
        clearInterval(this.timer);
      }
    }, 1000);
  }

  private startGame() {
    this.isGameStarted = true;
    this.getPlayerForGame();
  }

  checkPlayer() {
    console.log(this.inputValue);
    console.log('here');
    if (this.inputValue === (+this.player.number)) {
      this.points += 1;
    }

    this.inputValue = null;
    this.getPlayerForGame();
  }

  getPlayerForGame() {
    const randNumber = Math.floor(Math.random() * this.players.length);
    this.playerNum = randNumber;
    this.player = this.players[randNumber];
  }

  alertUser(points: number) {
    this.alertCtrl.create({
      header: 'Score:',
      message: `${points} Points`,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  alertInfo() {
    this.alertCtrl.create({
      header: 'Information',
      message: 'Press START to start the timer. Try to guess as many players\' numbers as possible.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

}
