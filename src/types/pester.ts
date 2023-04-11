import * as yup from 'yup';
import { TrollSchema } from './troll';
import { UserSchema } from './user';
import { requiredish, ensureish } from './generics';

const LogSchema = yup.object({
  character: yup.number().integer().min(0).optional(),
  text: yup.string().required("Text?"),
  time: yup.string(),
  noDash: yup.boolean(),
  quirk: yup.string().default("default"),
  id: yup.string().required("Need ID here").lowercase().matches(/[^a-zA-Z0-9-_]/g).min(3, "ID too short.").max(50, "ID too long!")
});

export interface Log extends yup.InferType<typeof LogSchema> {}

export const CharacterReferenceSchema = yup.object({
  character: TrollSchema.required("Character?"),
  time: yup.string().ensure()
});

export interface CharacterReference extends yup.InferType<typeof CharacterReferenceSchema> {}

export const PesterlogSchema = yup.object({
  owners: yup.array().of(UserSchema).required(),
  name: yup.string().required("Name?"),
  description: yup.string().required("Pootis 'cription here!").min(3, "Description too short").max(10000, "Description is too long!"),
  date: yup.date().required("Date?"),
  characters: yup.array().of(CharacterReferenceSchema).required("Characters?"),
  config: yup.object({
    memo: yup.boolean().default(false),
    memoName: yup.string().required("Memo Name?"),
    memoCreator: yup.number().integer().min(0).required("Memo Opener?"),
    memoCreationTime: yup.string().ensure()
  }).optional(),
  log: yup.array().of(LogSchema).required("Log?")
}).required();

export const ClientPesterlogSchema = PesterlogSchema.shape({
  owners: yup.array().of(yup.string()),
  characters: yup.array().of(yup.object({
    character: yup.string().required("Character?"),
    time: yup.string().ensure()
  })).required("Characters?")
});

export interface Pesterlog extends yup.InferType<typeof PesterlogSchema> {}
export interface ClientPesterlog extends yup.InferType<typeof ClientPesterlogSchema> {}