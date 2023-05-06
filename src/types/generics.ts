import * as yup from 'yup';
import { toInt } from './assist/colors';

export type Color = [number, number, number];
export const rgb = (
  r: number,
  g: number,
  b: number
): Color => [r, g, b];
export const requiredish =
  (message?: string) =>
  (isEdit: any[], fieldSchema: any): yup.AnySchema =>
    isEdit ? fieldSchema : fieldSchema.required(message);
export const ensureish =
  () =>
  (isEdit: any[], fieldSchema: any): yup.AnySchema =>
    isEdit ? fieldSchema : fieldSchema.ensure();

export const PolicySchema = yup
  .string()
  .oneOf(['yes', 'ask', 'no'])
  .default('no');

export const PreferenceSchema = yup.object({
  thing: yup
    .string()
    .required('Preference thing?')
    .min(3, 'Preference too short.')
    .max(140, 'Preference too long!'),
  opinion: yup.boolean().required('Preference opinion?')
});

export const QuirkSchema = yup.object({
  function: yup.string().required('Function?'),
  arguments: yup.array().of(yup.mixed())
});

export interface Quirk
  extends yup.InferType<typeof QuirkSchema> {}

export const ColorSchema = yup
  .number()
  .transform((v, ov) => toInt(ov))
  .min(0)
  .max(16777215, 'Color is over hex maximum')
  .default(0);

export const IDSchema = yup
  .string()
  .required('Need ID here')
  .lowercase()
  .matches(/[a-zA-Z0-9-_]/g)
  .min(3, 'ID too short.')
  .max(50, 'ID too long!');

export interface GenericHolder {
  id: string;
  data: any;
}
