import * as yup from 'yup';
import { FlairSchema } from './flair';
import { requiredish } from './generics';
import { PossibleBloods } from './assist/signs';

export const UserSchema = yup.object({
  username: yup.string().required("Username?").min(3, "Username too short.").max(50, "Username too long!"),
  description: yup.string().max(500, "Description is too long!").ensure(),
  url: yup.string().url("That's not a valid URL.").ensure(),
  flairs: yup.array().of(FlairSchema).ensure(),
  color: yup.string().required("User color?").oneOf(Object.keys(PossibleBloods)),
  id: yup.string().required("Need ID here").lowercase().matches(/[^a-zA-Z0-9-_]/g).min(3, "ID too short.").max(50, "ID too long!")
}).required();

export const ClientUserSchema = UserSchema.shape({
  flairs: yup.array().of(yup.string()).ensure()
});

export interface User extends yup.InferType<typeof UserSchema> {}
export interface ClientUser extends yup.InferType<typeof ClientUserSchema> {}