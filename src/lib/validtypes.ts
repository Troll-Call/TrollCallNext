import { Troll } from '@/types/troll';
import { User } from '@/types/user';
import { Flair } from '@/types/flair';
import { Pesterlog } from '@/types/pester';
import { DocumentSnapshot, doc, getDoc } from 'firebase/firestore';
import { database } from '@/lib/firebase';

interface FirestoreConverter {
  name: string,
  fromFirestore: (input:DocumentSnapshot) => any
}

const validtypes:{[key:string]:FirestoreConverter} = {
  "trolls": {
    name: "Troll",
    async fromFirestore (input):Promise<Troll> {
      let troll = input.data() as Troll;
      troll.owners = await Promise.all(troll.owners.map(async (x:any) => x = await (await getDoc(doc(database, "/users/" + x).withConverter(validtypes.users))).data()));
      return troll;
    }
  },
  "users": {
    name: "User",
    async fromFirestore (input):Promise<User> {
      let user = input.data() as User;
      user.flairs = await Promise.all(user.flairs.map(async (x:any) => x = await (await getDoc(x)).data()));
      return user;
    }
  },
  "flairs": {
    name: "Flair",
    fromFirestore (input):Flair {
      return input.data() as Flair;
    }
  },
  "pesters": {
    name: "Pesterlog",
    async fromFirestore (input):Promise<Pesterlog> {
      let pester = input.data() as Pesterlog;
      pester.characters = await Promise.all(pester.characters.map(async (x:any) => x.character = await (await getDoc(x.character)).data()));
      return pester;
    }
  }
}

export default validtypes;