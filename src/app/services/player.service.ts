import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Player {
  number: number;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  subscription: Subscription;

  private playersCollection: AngularFirestoreCollection<Player>;

  private players: Observable<Player[]>;

  constructor(db: AngularFirestore) {
    this.playersCollection = db.collection<Player>('players');

    this.players = this.playersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(id) {
    return this.playersCollection.doc<Player>(id).valueChanges();
  }

  updatePlayer(player: Player, id: string) {
    return this.playersCollection.doc(id).update(player);
  }

  addPlayer(player: Player) {
    return this.playersCollection.add(player);
  }

  removePlayer(id) {
    return this.playersCollection.doc(id).delete().then(data => console.log('Ok'));
  }
}
