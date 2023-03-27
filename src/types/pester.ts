import * as yup from 'yup';
import { TrollSchema } from './troll';
import { UserSchema } from './user';

const LogSchema = yup.object({
  character: yup.number().positive().required("Character?"),
  text: yup.string().required("Text?"),
  action: yup.object({
    text: yup.string(),
    time: yup.string()
  }).optional(),
  quirk: yup.string().default("default")
});

export const PesterlogSchema = yup.object({
  owners: yup.array().of(UserSchema),
  name: yup.string().required("Name?"),
  description: yup.string().min(3, "Description too short").max(10000, "Description is too long!").required(),
  date: yup.number().positive().required("Date?"),
  characters: yup.array().of(yup.object({
    character: TrollSchema.required("Character?"),
    time: yup.string().uppercase()
  })).required("Characters?")
}).required();

export const ClientPesterlogSchema = PesterlogSchema.shape({
  owners: yup.array().of(yup.string()),
  characters: yup.array().of(yup.object({
    character: yup.string().required("Character?"),
    time: yup.string().uppercase()
  })).required("Characters?")
});

export interface Pesterlog extends yup.InferType<typeof PesterlogSchema> {}
export interface ClientPesterlog extends yup.InferType<typeof ClientPesterlogSchema> {}