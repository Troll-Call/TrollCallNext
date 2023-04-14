import * as yup from 'yup';
import { ColorSchema, IDSchema, PolicySchema, PreferenceSchema, QuirkSchema } from './generics';
import { UserSchema } from './user';
import { requiredish } from './generics';

export const TrollSchema = yup.object({
  owners: yup.array().of(UserSchema).required(),
  name: yup.object({
    first: yup.string().required("First name?").length(6, "First name has to be exactly 6 characters long"),
    last: yup.string().required("Last name?").length(6, "Last name has to be exactly 6 characters long")
  }).required("Name?"),
  pronunciation: yup.object({
    first: yup.string().required("First pronunciation?").lowercase(),
    last: yup.string().required("Last pronunciation?").lowercase()
  }).required("Pronunciation?"),
  username: yup.string().matches(/^(([a-z])[a-z]+)(([A-Z])[a-z]+)$/, "Username is incorrect").required("Username?"),
  description: yup.string().min(100, "Description is too short.").max(1000, "Description is too long!").ensure(),
  age: yup.number().required("Age?").positive("Age can't be less than or equal to 0"),
  sign: yup.object({
    extended: yup.string().required("Extended Zodiac index (e.g. Virsces, Arrius, Leo)?"),
    color: yup.number().min(0, "Number must not be lower than Aries (0)").max(11, "Number must not be higher than Pisces (11)").required("No sign?"),
    fakeColor: yup.number().min(0, "Number must not be lower than Aries (0)").max(11, "Number must not be higher than Pisces (11)").notRequired()
  }).required("Sign?"),
  species: yup.string().matches(/^Troll($|-.+)/, "Species does not seem to be a subset of trollkind.").default("Troll"),
  pronouns: yup.array().of(yup.string().required("Pronoun?").matches(/\w*\/\w*/, "Pronoun is incorrectly formatted (correct: [1]/[2], e.x. she/her)")).required("Pronouns?"),
  gender: yup.string().required("Gender?"),
  height: yup.number().required("Height?").positive(),
  colors: yup.array().of(ColorSchema).required("Colors?"),
  policies: yup.object({
    fanart: PolicySchema.required("Fanart policy? (yes|ask|no)"),
    fanartOthers: PolicySchema.required("Fanart others policy? (yes|ask|no)"),
    kinning: PolicySchema.required("Kinning policy? (yes|ask|no)"),
    shipping: PolicySchema.required("Shipping policy? (yes|ask|no)"),
    fanfiction: PolicySchema.required("Fan-fiction policy? (yes|ask|no)")
  }).required("Policies?"),
  preferences: yup.array().of(PreferenceSchema).required("Preferences?").min(6, "Too little preferences (need at or above 3)").max(24, "Too much preferences (need at or under 24)"),
  facts: yup.array().of(yup.string().min(5, "Fact is too short.").max(140, "Fact is too long!").required("Fact?")).required("Facts?").min(3, "Too little facts (need at or above 3)").max(5, "Too many facts (need at or under 5)"),
  quirks: yup.object().shape({
    default: yup.array().of(QuirkSchema).required("Default quirk required (leave empty \"[]\" if none)")
  }).required("Quirks? (put {default:[]} if none)"),
  id: IDSchema
}).required();

export const ClientTrollSchema = TrollSchema.shape({
  owners: yup.array().of(yup.string())
});

export interface Troll extends yup.InferType<typeof TrollSchema> {}
export interface ClientTroll extends yup.InferType<typeof ClientTrollSchema> {}