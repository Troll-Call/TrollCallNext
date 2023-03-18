import { Troll } from '@/types/troll';
import { User } from '@/types/user';
import { Flair } from '@/types/flair';
import { Pesterlog } from '@/types/pester';
import { DocumentSnapshot, SnapshotOptions, doc, getDoc } from 'firebase/firestore';
import { database } from '@/middleware/firebase';
import console from 'console';

interface FirestoreConverter {
  fromFirestore: (input:DocumentSnapshot, options:SnapshotOptions) => any,
  toFirestore: (input:any) => any|null
}

const validtypes:{[key:string]:FirestoreConverter} = {
  "trolls": {
    async fromFirestore (input, options):Promise<Troll> {
      let troll = input.data(options) as Troll;
      troll.owners = await Promise.all(troll.owners.map(async x => x = await (await getDoc(x.withConverter(validtypes.users))).data()))
      return troll;
    },
    toFirestore (input:Troll):(Troll|null) {
      const trigger:boolean[] = [
        input.colors.every(x => x <= 16777215 && x >= 0),
        input.name.first.length === 6,
        input.name.last.length === 6
      ];
      if (trigger) input.owners = input.owners.map(x => x = doc(database, x).withConverter(validtypes.users));
      return trigger.every(x=>x) ? input : null;
    }
  },
  "users": {
    async fromFirestore (input, options):Promise<User> {
      let user = input.data(options) as User;
      user.flairs = await Promise.all(user.flairs.map(async x => x = await (await getDoc(x)).data()));
      return user;
    },
    async toFirestore (input:User):Promise<User> {
      input.flairs = await input.flairs.map(x => x = doc(database, x).withConverter(validtypes.flairs));
      return input;
    }
  },
  "flairs": {
    fromFirestore (input, options):Flair {
      return input.data(options) as Flair;
    },
    toFirestore (input:Flair):(Flair|null) {
      var trigger = (input.color <= 16777215 && input.color >= 0);
      return trigger ? input : null;
    }
  },
  "pesters": {
    async fromFirestore (input, options):Promise<Pesterlog> {
      let pester = input.data(options) as Pesterlog;
      console.log(pester.owners, pester.characters);
      pester.owners = await Promise.all(pester.owners.map(async x => x = await (await getDoc(x.withConverter(validtypes.users))).data()));
      pester.characters = await Promise.all(pester.characters.map(async x => x.character = await (await getDoc(x.character.withConverter(validtypes.trolls))).data()));
      return pester;
    },
    toFirestore (input:Pesterlog):(Pesterlog|null) {
      var trigger = [
        (input.date <= Date.now() && input.date >= 0),
        input.log.every(x => (x.character < input.characters.length && x.character >= 0))
      ];
      if (trigger) input.owners = input.owners.map(x => x = doc(database, x).withConverter(validtypes.users));
      if (trigger) input.characters = input.characters.map(x => x.character = doc(database, x.character).withConverter(validtypes.trolls));
      return trigger ? input : null;
    }
  }
}

export default validtypes;