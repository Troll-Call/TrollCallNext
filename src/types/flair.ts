import * as yup from 'yup';

export const FlairSchema = yup.object({
  name: yup.string().required("Name?"),
  color: yup.number().positive().max(16777215, "Color is over hex maximum").required("Color?")
}).required();

export interface Flair extends yup.InferType<typeof FlairSchema> {}