import * as yup from 'yup';
import { PolicySchema, PreferenceSchema, QuirkSchema } from './generics';
import { UserSchema } from './user';

export const TrollSchema = yup.object({
  owners: yup.array().of(UserSchema),
  name: yup.object({
    first: yup.string().required("First name?").length(6, "First name has to be exactly 6 characters long"),
    last: yup.string().required("Last name?").length(6, "Last name has to be exactly 6 characters long")
  }).required("Name?"),
  pronunciation: yup.object({
    first: yup.string().required("First pronunciation?").lowercase(),
    last: yup.string().required("Last pronunciation?").lowercase()
  }).required("Pronunciation?"),
  username: yup.string().required("Username?").matches(/((?<letter1>^[a-z])[a-z]*)((?<letter2>[A-Z])[a-z]*)/, "Username is incorrect"),
  description: yup.string().min(100, "Description too short").max(10000, "Description is too long!").notRequired(),
  age: yup.number().required().positive(),
  sign: yup.object({
    extended: yup.string().required("Extended Zodiac index?"),
    color: yup.number().min(0, "Number must not be lower than Aries (0)").max(11, "Number must not be higher than Pisces (11)").required("Sign index?"),
    fakeColor: yup.number().min(0, "Number must not be lower than Aries (0)").max(11, "Number must not be higher than Pisces (11)").notRequired()
  }).required("Sign?"),
  species: yup.string().default("Troll"),
  pronouns: yup.array().of(yup.string().matches(/\w*\/\w*/, "Pronoun is incorrectly formatted (correct: [1]/[2], e.x. she/her)")).required("Pronouns?"),
  gender: yup.string().required("Gender?"),
  height: yup.number().required("Height?").positive(),
  colors: yup.array().of(yup.number().positive().max(16777215, "Color is over hex maximum")).required("Colors?"),
  policies: yup.object({
    fanart: PolicySchema.required("Fanart policy? (yes|ask|no)"),
    fanartOthers: PolicySchema.required("Fanart others policy? (yes|ask|no)"),
    kinning: PolicySchema.required("Kinning policy? (yes|ask|no)"),
    shipping: PolicySchema.required("Shipping policy? (yes|ask|no)"),
    fanfiction: PolicySchema.required("Fan-fiction policy? (yes|ask|no)")
  }).required("Policies?"),
  preferences: yup.array().of(PreferenceSchema).required().min(6, "Too little preferences (need at or above 3)").max(24, "Too much preferences (need at or under 24)"),
  facts: yup.array().of(yup.string()).min(3, "Too little facts (need at or above 3)").max(5, "Too many facts (need at or under 5)"),
  quirks: yup.object().shape({
    default: QuirkSchema
  })
}).required();

export const ClientTrollSchema = TrollSchema.shape({
  owners: yup.array().of(yup.string())
});

export interface Troll extends yup.InferType<typeof TrollSchema> {}
export interface ClientTroll extends yup.InferType<typeof ClientTrollSchema> {}