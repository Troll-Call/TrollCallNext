import * as yup from 'yup';
import { requiredish } from './generics';

export const FlairSchema = yup.object({
  name: yup.string().required("Name?"),
  color: yup.number().positive().max(16777215, "Color is over hex maximum").required("Color?"),
  id: yup.string().required("Need ID here").lowercase().matches(/[^a-zA-Z0-9-_]/g).min(3, "ID too short.").max(50, "ID too long!")
}).required();

export interface Flair extends yup.InferType<typeof FlairSchema> {}