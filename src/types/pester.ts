import * as yup from 'yup';
import { TrollSchema } from './troll';
import { UserSchema } from './user';

const LogSchema = yup.object({
  character: yup.number().integer().optional(),
  text: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Text?")),
  time: yup.string(),
  noDash: yup.boolean(),
  quirk: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.default("default"))
});

export interface Log extends yup.InferType<typeof LogSchema> {}

export const PesterlogSchema = yup.object({
  owners: yup.array().of(UserSchema),
  name: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Name?")),
  description: yup.string().min(3, "Description too short").max(10000, "Description is too long!").when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required()),
  date: yup.date().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Date?")),
  characters: yup.array().of(yup.object({
    character: TrollSchema.when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Character?")),
    time: yup.string().ensure()
  })).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Characters?")),
  config: yup.object({
    memo: yup.boolean(),
    memoName: yup.string(),
    memoCreator: yup.number().positive().integer().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Memo Opener?")),
    memoCreationTime: yup.string().ensure()
  }),
  log: yup.array().of(LogSchema).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Log?"))
}).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required());

export const ClientPesterlogSchema = PesterlogSchema.shape({
  owners: yup.array().of(yup.string()),
  characters: yup.array().of(yup.object({
    character: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Character?")),
  })).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Characters?"))
});

export interface Pesterlog extends yup.InferType<typeof PesterlogSchema> {}
export interface ClientPesterlog extends yup.InferType<typeof ClientPesterlogSchema> {}