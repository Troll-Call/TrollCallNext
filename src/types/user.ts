import * as yup from 'yup';
import { FlairSchema } from './flair';

export const UserSchema = yup.object({
  username: yup.string().required("Username?"),
  url: yup.string().url().required("URL?"),
  flairs: yup.array().of(FlairSchema).optional()
}).required();

export const ClientUserSchema = UserSchema.shape({
  flairs: yup.array().of(yup.string()).optional()
});

export interface User extends yup.InferType<typeof UserSchema> {}
export interface ClientUser extends yup.InferType<typeof ClientUserSchema> {}