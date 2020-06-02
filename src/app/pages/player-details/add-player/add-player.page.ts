import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Player } from '../player.model';
import { PlayerService } from 'src/app/services/player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { COUNTRIES } from './countries.model';
import { Subscription } from 'rxjs';

interface Country {
  name: string;
  dialCode: string;
  code: string;
  secondCode: string;
  codeLower: string;
}


@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage implements OnInit {

  playerForm: FormGroup;

  player: Player = new Player();

  countryData: Country[];

  playerId: string;

  isLoading = true;

  subscription: Subscription;

  constructor(public formBuilder: FormBuilder,
              public playerService: PlayerService,
              public router: Router,
              public navCtrl: NavController,
              public route: ActivatedRoute) {

    this.countryData = COUNTRIES as Country[];
    this.setForm();
   }

  ngOnInit() {}

  ionViewDidEnter() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.playerId = paramMap.get('id');
        this.subscription = this.playerService.getPlayer(this.playerId).subscribe(  (data: any) => {
          this.player = data;
          this.setForm();
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }


  savePlayer() {

   if (this.playerId) {
    this.playerService.updatePlayer(this.playerForm.value, this.playerId);
   } else {
    this.playerService.addPlayer(this.playerForm.value);
   }

   this.router.navigate(['../player-details']);
  }

  ionViewDidLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private setForm() {
    this.playerForm = this.formBuilder.group({
      firstName: [ this.player.firstName, [ Validators.required]],
      lastName: [this.player.lastName, [Validators.required]],
      number: [this.player.number, [Validators.required]],
      position: [this.player.position, [Validators.required]],
      nationality: [this.player.nationality, [Validators.required]],
    });
  }

}
