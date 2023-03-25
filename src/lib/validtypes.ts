import { isTroll, ServerTroll, Troll } from '@/types/troll';
import { isUser, ServerUser, User } from '@/types/user';
import { Flair, isFlair } from '@/types/flair';
import { isPesterlog, Pesterlog, ServerPesterlog } from '@/types/pester';
import { DocumentSnapshot, SnapshotOptions, doc, getDoc } from 'firebase/firestore';
import { database } from '@/lib/firebase';

interface FirestoreConverter {
  name: string,
  fromFirestore: (input:DocumentSnapshot, options:SnapshotOptions) => any,
  toFirestore: (input:any) => any|null
}

const validtypes:{[key:string]:FirestoreConverter} = {
  "trolls": {
    name: "Troll",
    async fromFirestore (input, options):Promise<ServerTroll> {
      let troll = input.data(options) as ServerTroll;
      troll.owners = await Promise.all(troll.owners.map(async x => x = await (await getDoc(doc(database, "/users/" + x).withConverter(validtypes.users))).data()));
      return troll;
    },
    toFirestore (input:Troll):(ServerTroll|null) {
      if (!isTroll(input)) return null;
      const trigger:boolean[] = [
        input,
        input.colors.every(x => x <= 16777215 && x >= 0),
        input.name.first.length === 6,
        input.name.last.length === 6
      ];
      return trigger.every(x=>x) ? input : null;
    }
  },
  "users": {
    name: "User",
    async fromFirestore (input, options):Promise<ServerUser> {
      let user = input.data(options) as ServerUser;
      user.flairs = await Promise.all(user.flairs.map(async x => x = await (await getDoc(x)).data()));
      return user;
    },
    toFirestore (input:User):(ServerUser|null) {
      if (!isUser(input)) return null;
      input.flairs = input.flairs.map(x => x = doc(database, x));
      return input;
    }
  },
  "flairs": {
    name: "Flair",
    fromFirestore (input, options):Flair {
      return input.data(options) as Flair;
    },
    toFirestore (input:Flair):(Flair|null) {
      if (!isFlair(input)) return null;
      var trigger = (input.color <= 16777215 && input.color >= 0);
      return trigger ? input : null;
    }
  },
  "pesters": {
    name: "Pesterlog",
    async fromFirestore (input, options):Promise<ServerPesterlog> {
      let pester = input.data(options) as ServerPesterlog;
      pester.characters = await Promise.all(pester.characters.map(async x => x.character = await (await getDoc(x.character)).data()));
      return pester;
    },
    toFirestore (input:Pesterlog):(ServerPesterlog|null) {
      if (!isPesterlog(input)) return null;
      var trigger = [
        (input.date <= Date.now() && input.date >= 0),
        input.log.every(x => (x.character < input.characters.length && x.character >= 0))
      ];
      if (trigger) input.owners = input.owners.map(x => x = doc(database, "/users/" + x));
      if (trigger) input.characters = input.characters.map(x => x.character = doc(database, x.character));
      return trigger.every(x=>x) ? input : null;
    }
  }
}

export default validtypes;