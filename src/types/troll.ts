import * as yup from 'yup';
import { PolicySchema, PreferenceSchema, QuirkSchema } from './generics';
import { UserSchema } from './user';

export const TrollSchema = yup.object({
  owners: yup.array().of(UserSchema),
  name: yup.object({
    first: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("First name?").length(6, "First name has to be exactly 6 characters long")),
    last: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Last name?").length(6, "Last name has to be exactly 6 characters long"))
  }).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Name?")),
  pronunciation: yup.object({
    first: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("First pronunciation?").lowercase()),
    last: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Last pronunciation?").lowercase())
  }).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Pronunciation?")),
  username: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Username?").matches(/((?<letter1>^[a-z])[a-z]*)((?<letter2>[A-Z])[a-z]*)/, "Username is incorrect")),
  description: yup.string().min(100, "Description too short").max(10000, "Description is too long!").notRequired(),
  age: yup.number().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required().positive()),
  sign: yup.object({
    extended: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Extended Zodiac index?")),
    color: yup.number().min(0, "Number must not be lower than Aries (0)").max(11, "Number must not be higher than Pisces (11)").when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Sign index?")),
    fakeColor: yup.number().min(0, "Number must not be lower than Aries (0)").max(11, "Number must not be higher than Pisces (11)").notRequired()
  }).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Sign?")),
  species: yup.string().default("Troll"),
  pronouns: yup.array().of(yup.string().matches(/\w*\/\w*/, "Pronoun is incorrectly formatted (correct: [1]/[2], e.x. she/her)")).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Pronouns?")),
  gender: yup.string().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Gender?")),
  height: yup.number().when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Height?").positive()),
  colors: yup.array().of(yup.number().positive().max(16777215, "Color is over hex maximum")).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Colors?")),
  policies: yup.object({
    fanart: PolicySchema.when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Fanart policy? (yes|ask|no)")),
    fanartOthers: PolicySchema.when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Fanart others policy? (yes|ask|no)")),
    kinning: PolicySchema.when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Kinning policy? (yes|ask|no)")),
    shipping: PolicySchema.when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Shipping policy? (yes|ask|no)")),
    fanfiction: PolicySchema.when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Fan-fiction policy? (yes|ask|no)"))
  }).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required("Policies?")),
  preferences: yup.array().of(PreferenceSchema).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required().min(6, "Too little preferences (need at or above 3)").max(24, "Too much preferences (need at or under 24)")),
  facts: yup.array().of(yup.string()).min(3, "Too little facts (need at or above 3)").max(5, "Too many facts (need at or under 5)"),
  quirks: yup.object().shape({
    default: yup.array().of(QuirkSchema)
  })
}).when('$isEdit', (isEdit, fieldSchema) => isEdit ? fieldSchema : fieldSchema.required());

export const ClientTrollSchema = TrollSchema.shape({
  owners: yup.array().of(yup.string())
});

export interface Troll extends yup.InferType<typeof TrollSchema> {}
export interface ClientTroll extends yup.InferType<typeof ClientTrollSchema> {}