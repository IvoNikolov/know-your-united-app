import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Player {
  number: number;
  firstName: string;
  lastName: string;
//   nationality: string;
//   age: string;
//   goal: number,
//   shotsOnTarget: number;
//   appearances: number;
//   substitute: number;
//   tackleSuccess: number;
//   accuracy: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersCollection: AngularFirestoreCollection<Player>;

  private players: Observable<Player[]>

  constructor(db:AngularFirestore) {
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

  updatePlayer(player: Player, id:string){
    return this.playersCollection.doc(id).update(player);
  }

  addPlayer(player: Player) {
    return this.playersCollection.add(player);
  }

  removePlayer(id) {
    return this.playersCollection.doc(id).delete();
  }
}
