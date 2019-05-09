import { Player, PlayerService } from '../../services/player.service'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  players: Player[];

  constructor(private playerService: PlayerService) { 

  }

  ngOnInit() {
    this.playerService.getPlayers().subscribe( res => {
      this.players = res;
      console.log(this.players);
    });
  }

  removePlayer(item) {
    this.playerService.removePlayer(item.id);
  }

}
