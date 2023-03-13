import { MongooseTroll } from '@/Mongoose/Troll';
import { MongooseUser } from '@/Mongoose/User';
import { MongooseFlair } from '@/Mongoose/Flair';
import { MongoosePester } from '@/Mongoose/Pester';

const generics:{[key:string]:{[key:string]:any}} = {
  "trolls": {
    populate: {path: "owners", populate: ["flairs"]},
    hasRef: true,
    type: MongooseTroll
  },
  "users": {
    populate: "flairs",
    hasRef: false,
    type: MongooseUser
  },
  "flairs": {
    populate: "",
    hasRef: false,
    type: MongooseFlair
  },
  "pesters": {
    populate: [{path: "owners", populate: ["flairs"]}, {path: "characters", populate: [{path: "character", populate: [{path: "owners", populate: ["flairs"]}]}]}],
    hasRef: true,
    type: MongoosePester
  }
}

export default generics;