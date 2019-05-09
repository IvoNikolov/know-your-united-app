import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Player } from './player.model';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.page.html',
  styleUrls: ['./player-details.page.scss'],
})
export class PlayerDetailsPage implements OnInit {

  playerForm: FormGroup;

  player: Player;

  constructor(public formBuilder: FormBuilder) {
    this.player = new Player();

    this.playerForm = formBuilder.group({
      firstName: [ this.player.firstName, Validators.required],
      lastName: [this.player.lastName, Validators.required],
      number: [this.player.number, Validators.required],
      position: [this.player.position, Validators.required],
      nationality: [this.player.nationality, Validators.required],
      age: [this.player.age, Validators.required],
      appearances: [this.player.appearances, Validators.required],
      appearancesAsSubstitute: [this.player.appearancesAsSubstitute, Validators.required],
      goalsAndCleanSheets: [this.player.goalsAndCleanSheets, Validators.required],
      yellowCards: [this.player.yellowCards, Validators.required],
      redCards: [this.player.redCards, Validators.required],
    });
  }

  ngOnInit() {
   
   
  }

  loadPlayer() {
  }

  savePlayer() {
    console.log(this.playerForm);
    // this.playerService.addPlayer(this.player);
  }

}
