import firebase from 'firebase';
import { firebaseAuth, firebaseDb } from './firebase';

export class Item {
  constructor(uid) {
    this.uid = uid;
  }

  pushItem(title, value) {
    const data = {
      title,
      value
    };
    const ref = firebaseDb.ref(`ITEMS/${this.uid}`).push(data);
    const path = ref.toString();
    const key = path.match(/[^/]+(?=\/$|$)/);
    return key[0];
  }

  removeItem(key) {
    firebaseDb.ref(`ITEMS/${this.uid}/${key}`).remove();
  }

}
