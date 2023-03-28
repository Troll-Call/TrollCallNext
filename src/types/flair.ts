import * as yup from 'yup';

export const FlairSchema = yup.object({
  name: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Name?")),
  color: yup.number().positive().max(16777215, "Color is over hex maximum").when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Color?"))
}).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required());

export interface Flair extends yup.InferType<typeof FlairSchema> {}