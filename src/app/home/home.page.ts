import { Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router) {
  }

  click() {
    console.log('Hello');
    this.router.navigateByUrl('player-details');
  }

  clickTimer() {
    this.router.navigateByUrl('timer');
  }

  clickTeam() {
    this.router.navigateByUrl('team');
  }

}
