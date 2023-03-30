import * as yup from 'yup';
import { TrollSchema } from './troll';
import { UserSchema } from './user';
import { requiredish, ensureish } from './generics';

const LogSchema = yup.object({
  character: yup.number().integer().optional(),
  text: yup.string().required("Text?"),
  time: yup.string(),
  noDash: yup.boolean(),
  quirk: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.default("default"))
});

export interface Log extends yup.InferType<typeof LogSchema> {}

export const CharacterReferenceSchema = yup.object({
  character: TrollSchema.required("Character?"),
  time: yup.string().ensure()
});

export interface CharacterReference extends yup.InferType<typeof CharacterReferenceSchema> {}

export const PesterlogSchema = yup.object({
  owners: yup.array().of(UserSchema),
  name: yup.string().required("Name?"),
  description: yup.string().min(3, "Description too short").max(10000, "Description is too long!").required(),
  date: yup.date().required("Date?"),
  characters: yup.array().of(CharacterReferenceSchema).required("Characters?"),
  config: yup.object({
    memo: yup.boolean().notRequired(),
    memoName: yup.string().notRequired(),
    memoCreator: yup.number().integer().required("Memo Opener?"),
    memoCreationTime: yup.string().ensure()
  }).notRequired(),
  log: yup.array().of(LogSchema).required("Log?")
}).required();

export const ClientPesterlogSchema = PesterlogSchema.shape({
  owners: yup.array().of(yup.string()),
  characters: yup.array().of(yup.object({
    character: yup.string().required("Character?"),
  }))
});

export interface Pesterlog extends yup.InferType<typeof PesterlogSchema> {}
export interface ClientPesterlog extends yup.InferType<typeof ClientPesterlogSchema> {}