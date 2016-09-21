import { firebaseDb } from './firebase';

export class Items {
  constructor(uid) {
    this.uid = uid;
  }

  getItemsRef() {
    return firebaseDb.ref(`ITEMS/${this.uid}`);
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
