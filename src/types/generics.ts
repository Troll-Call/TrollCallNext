import * as yup from 'yup';
import { TrollSchema } from './troll';

export type Color = [number, number, number];
export const rgb = (r:number, g:number, b:number):Color => ([r,g,b]);

export const PolicySchema = yup.string().oneOf(["yes", "ask", "no"]);

export const PreferenceSchema = yup.object({
  thing: yup.string().required("Preference thing?"),
  opinion: yup.boolean().required("Preference opinion?")
});

export const QuirkSchema = yup.object({
  function: yup.string().required("Function?"),
  arguments: yup.array().of(yup.mixed())
})

export interface GenericHolder {
  id: string,
  data: any
}