import { ClientTrollSchema, TrollSchema } from '@/types/troll';
import { ClientPesterlogSchema, PesterlogSchema } from '@/types/pester';
import { FlairSchema } from '@/types/flair';
import { ClientUserSchema, UserSchema } from '@/types/user';
import { Schema } from 'yup';

interface FirestoreConverter {
  name: string,
  policy: Schema,
  clientPolicy: Schema
}

const validyum:{[key:string]:FirestoreConverter} = {
  "trolls": {
    name: "Troll",
    policy: TrollSchema,
    clientPolicy: ClientTrollSchema
  },
  "users": {
    name: "User",
    policy: UserSchema,
    clientPolicy: ClientUserSchema
  },
  "flairs": {
    name: "Flair",
    policy: FlairSchema,
    clientPolicy: FlairSchema
  },
  "pesters": {
    name: "Pesterlog",
    policy: PesterlogSchema,
    clientPolicy: ClientPesterlogSchema
  }
}

export default validyum;