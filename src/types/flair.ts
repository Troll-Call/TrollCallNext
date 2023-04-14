import * as yup from 'yup';
import { ColorSchema, IDSchema, requiredish } from './generics';

export const FlairSchema = yup.object({
  name: yup.string().required("Name?"),
  color: ColorSchema,
  url: yup.string().url("That's not a valid URL.").ensure(),
  id: IDSchema
}).required();

export interface Flair extends yup.InferType<typeof FlairSchema> {}