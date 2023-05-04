import Box from "@/components/box";
import Navbar from "@/components/nav";
import { brandUrl } from "@/types/assist/branding";
import { negate, themeColor, lightness, toHex, toInt } from "@/types/assist/colors";
import { Bloods, PossibleBloods } from "@/types/assist/signs";
import { FlairSchema } from "@/types/flair";
import { Flair as flairType } from "@/types/flair";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormEvent, useState } from "react";
import FlairRenderer from "@/components/flair";
import Footer from "@/components/footer";
import UsernameRenderer from "@/components/name";
import { Themer } from "@/components/themer";
import { error } from "@/components/form";

export default function Flair({}:{}) {
  const [testVals, setTestVals] = useState({} as flairType);
  const [textLength, setTextLength] = useState(0);
  return (
    <div className="wide base">
      <Navbar title={module.exports.default.name} type="Submit" />
      <div className="flex flex-row gap-4 justify-center flex-wrap">
        <Box title={"Submit a " + module.exports.default.name} className="flex-1">
          <Formik
            initialValues={{} as flairType}
            validationSchema={FlairSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(FlairSchema.validateSync(values), null, 2));
                setSubmitting(false);
              }, 2000);
            }}
          >{({ isSubmitting, setFieldValue, handleChange, handleBlur, values }) => (
            <Form> 
              <div>
                <div>A flair should only refer to a role, class, or notable accomplishment. Personally identifying flairs are <b>not allowed</b>, for personal identifiers should be put in a user&apos;s description.</div>
                <div>Good examples:
                  <ul>
                    <li>✅ <FlairRenderer flair={{name:"TrollCall Farted Harded Winner",color:0xFFFF00,id:"",url:""}} />
                    <div className="help">A flair for the winner of a (fake) notable event.</div></li>
                    <li>✅ <FlairRenderer flair={{name:"Owner",color:0xFF8000,id:"",url:""}} />
                    <div className="help">The owner of the site.</div></li>
                    <li>✅ <FlairRenderer flair={{name:"TrollCall Next Beta Tester",color:0x800080,id:"",url:""}} />
                    <div className="help">A beta tester for TrollCall Next, the current version of TrollCall.</div></li>
                    <li>✅ <FlairRenderer flair={{name:"Most Trolls",color:0x8000FF,id:"",url:""}} />
                    <div className="help">A (fake) accomplishment, showing that this user has the most trolls on the site.</div></li>
                  </ul>
                </div>
                <div>Bad examples:
                  <ul>
                    <li>⚠️ <FlairRenderer flair={{name:"he/him/his",color:0x000000,id:"",url:""}} />
                    <div className="help">Pronouns are an infinitely variable trait of language, and adding them all in TrollCall flairs would be a waste of space when they could just be written in your user description.</div></li>
                    <li>⚠️ <FlairRenderer flair={{name:"Feline",color:0x00FFFF,id:"",url:""}} />
                    <div className="help">Do not make a TrollCall user for your cat. Even if your cat knew how to make a TrollCall account (in which they would be allowed), species would be a poor addition as a flair anyway, as that information could also be put in your cat's user description.</div></li>
                    <li>⚠️ <FlairRenderer flair={{name:"Non-Binary",color:0xFFC000,id:"",url:""}} />
                    <div className="help">Gender can also be put in your user description.</div></li>
                    <li>⚠️ <FlairRenderer flair={{name:"fhqwhgadshgnsdhjsdbkhsdabkfabkveybvf",color:0xF80389/*AD5*/,id:"",url:""}} />
                    <div className="help">Don't submit useless or unnecessary flairs.</div></li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="label">Name <ErrorMessage name="name">{error}</ErrorMessage></div>
                <span>
                  <Field type="text" name="name" placeholder="Owner" onChange={(event:FormEvent) => {
                    handleChange(event);
                    setFieldValue('id',event.target.value.replace(/[^a-zA-Z0-9-_]/g, "_").replace(/_+/g, "_").replace(/_$/g, "").replace(/^_/g, "").toLowerCase());
                  }}/>
                </span>
                <div className="help">The name that displays in the flair.</div>
              </div>
              <div>
                <div className="label">Flair ID <ErrorMessage name="id">{error}</ErrorMessage></div>
                <span className="input">
                  flair/<Field type="text" name="id" placeholder="owner" onBlur={(event: FormEvent) => {
                      handleBlur(event);
                      setFieldValue('id',event.target.value.replace(/[^a-zA-Z0-9-_]/g, "_").toLowerCase());
                  }} />
                </span>
                <div className="help">Flair ID will update based on name, but you can always set one manually.</div>
              </div>
              <div>
                <div className="label">Website <ErrorMessage name="url">{error}</ErrorMessage></div>
                <span>
                  <Field type="url" name="url" placeholder="https://example.com/" />
                </span>
                <div className="help">If you have a website you want to link to when you click on the flair; for example, a flair for an MSPFA veteran would probably link to <b>https://mspfa.com/</b>.</div>
              </div>
              <div>
                <div className="label">Color <ErrorMessage name="color">{error}</ErrorMessage></div>
                <span>
                  <Field type="color" name="color" placeholder="https://example.com/" />
                </span>
                <div className="help">
                  The color of the flair.
                  <div className="warning">This page changes color based on this value!</div>
                </div>
              </div>
              <div>
                <div className="label">Preview</div>
                <span>
                  <Themer color={testVals.color ?? 0xff0000} label="neg" />
                  <UsernameRenderer user={{
                    username: "Johnny Doefor",
                    flairs: [
                      {
                        color: toInt(lightness(testVals.color ?? 0, 75, false)),
                        id: "75dark",
                        name: "-75",
                        url: testVals.url
                      },
                      {
                        color: toInt(lightness(testVals.color ?? 0, 50, false)),
                        id: "50dark",
                        name: "-50",
                        url: testVals.url
                      },
                      {
                        color: toInt(lightness(testVals.color ?? 0, 25, false)),
                        id: "25dark",
                        name: "-25",
                        url: testVals.url
                      },
                      testVals,
                      {
                        color: toInt(lightness(testVals.color ?? 0, 25, true)),
                        id: "25light",
                        name: "+25",
                        url: testVals.url
                      },
                      {
                        color: toInt(lightness(testVals.color ?? 0, 50, true)),
                        id: "50light",
                        name: "+50",
                        url: testVals.url
                      },
                      {
                        color: toInt(lightness(testVals.color ?? 0, 75, true)),
                        id: "75light",
                        name: "+75",
                        url: testVals.url
                      }
                    ]
                  }} full name />
                </span>
              </div>
              <div>
                <span className="submitRight">
                  <Field type="button" value="Preview" disabled={isSubmitting} onClick={() => {
                    setTestVals(values);
                  }} />
                  <Field type="submit" value="Submit" disabled={isSubmitting} />
                </span>
              </div>
            </Form>
          )}</Formik>
        </Box>
      </div>
      <Footer />
    </div>
  )
}