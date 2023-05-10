import { Troll } from '@/types/troll';
import { User } from '@/types/user';
import { Flair } from '@/types/flair';
import { ClientPesterlog, Pesterlog } from '@/types/pester';
import { DocumentSnapshot, doc, getDoc, Timestamp } from 'firebase/firestore';
import { database } from '@/lib/firebase';

interface FirestoreConverter {
  name: string;
  fromFirestore: (input: DocumentSnapshot) => any;
  toFirestore: (input: any) => any;
  toFormat?: (input: any) => any;
}

const validtypes: { [key: string]: FirestoreConverter } = {
  trolls: {
    name: 'Troll',
    async fromFirestore(input): Promise<Troll> {
      let troll = input.data() as Troll;
      troll.id = input.id;
      troll.owners = await Promise.all(
        troll.owners.map(
          async (x: any) => await validtypes.users.fromFirestore(await getDoc(doc(database, 'users', x)))
        )
      );
      return troll;
    },
    toFirestore(input): Troll {
      return input as Troll;
    }
  },
  users: {
    name: 'User',
    async fromFirestore(input): Promise<User> {
      let user = input.data() as User;
      user.id = input.id;
      if (user.flairs)
        user.flairs = await Promise.all(
          user.flairs.map(async (x: any) => await validtypes.flairs.fromFirestore(await getDoc(x)))
        );
      return user;
    },
    toFirestore(input): User {
      let user = input as any;
      user.flairs = user.flairs.map((x: any) => doc(database, x));
      return user as User;
    }
  },
  flairs: {
    name: 'Flair',
    fromFirestore(input): Flair {
      let flair = input.data() as Flair;
      flair.id = input.id;
      return flair;
    },
    toFirestore(input): Flair {
      return input as Flair;
    }
  },
  pesters: {
    name: 'Pesterlog',
    async fromFirestore(input): Promise<Pesterlog> {
      let pester = input.data() as Pesterlog;
      pester.id = input.id;
      pester.characters = await Promise.all(
        pester.characters.map(async (x: any) => {
          x.character = await validtypes.trolls.fromFirestore(await getDoc(x.character));
          return x;
        })
      );
      pester.owners = await Promise.all(
        pester.owners.map(
          async (x: any) => await validtypes.users.fromFirestore(await getDoc(doc(database, 'users', x)))
        )
      );
      pester.date = (pester.date as unknown as Timestamp).seconds * 1000;

      return pester;
    },
    async toFormat(input): Promise<Pesterlog> {
      let pester = input;
      pester.characters = await Promise.all(
        pester.characters.map(async (x: any) => {
          x.character = await validtypes.trolls.fromFirestore(await getDoc(doc(database, x.character)));
          return x;
        })
      );

      return pester;
    },
    toFirestore(input): Pesterlog {
      let pester = input as any;
      pester.characters = pester.characters.map((x: any) => {
        x.character = doc(database, x.character);
        return x;
      });
      return pester as Pesterlog;
    }
  }
};

export default validtypes;
