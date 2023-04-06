import Box from "@/components/box";
import Navbar from "@/components/nav";
import { brandUrl } from "@/types/assist/branding";
import { negate, themeColor, toHex } from "@/types/assist/colors";
import { Bloods, PossibleBloods } from "@/types/assist/signs";
import { ClientUser, ClientUserSchema } from "@/types/user";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormEvent, useState } from "react";
import UserRenderer from "@/pages/user/[id]";
import Footer from "@/components/footer";

const error = ((message:string) => <>-- <span className="error">{message}</span></>);

export default function User({}:{}) {
  const [testVals, setTestVals] = useState({});
  const [textLength, setTextLength] = useState(0);
  return (
    <div className="wide base">
      <Navbar title={module.exports.default.name} type="Submit" />
      <div className="flex flex-row gap-4 justify-center flex-wrap">
        <Box title="Submit a user" className="flex-1">
          <Formik
            initialValues={{}}
            validationSchema={ClientUserSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(ClientUserSchema.validateSync(values), null, 2));
                setSubmitting(false);
              }, 2000);
            }}
          >{({ isSubmitting, setFieldValue, handleChange, handleBlur, values }) => (
            <Form>
              <div>
                <div className="label">Username <ErrorMessage name="username">{error}</ErrorMessage></div>
                <span>
                  <Field type="text" name="username" placeholder="Johnny Doefor" onChange={(event:FormEvent) => {
                    handleChange(event);
                    setFieldValue('id',event.target.value.replace(/[^a-zA-Z0-9-_]/g, "_").replace(/_+/g, "_").replace(/_$/g, "").replace(/^_/g, "").toLowerCase());
                  }}/>
                </span>
                <div className="help">The name that displays on your user page and owned trolls.</div>
              </div>
              <div>
                <div className="label">User ID <ErrorMessage name="id">{error}</ErrorMessage></div>
                <span className="input">
                  {brandUrl}user/<Field type="text" name="id" placeholder="johnny.doefor" onBlur={(event: FormEvent) => {
                      handleBlur(event);
                      setFieldValue('id',event.target.value.replace(/[^a-zA-Z0-9-_]/g, "_").toLowerCase());
                  }} />
                </span>
                <div className="help">User ID will update based on username, but you can always set one manually.</div>
              </div>
              <div>
                <div className="label">Description ({textLength}/500) <ErrorMessage name="description">{error}</ErrorMessage></div>
                <span>
                  <textarea name="description" placeholder="Lorem ipsum dolor sit amet..." cols={32}
                    onChange={(event: FormEvent) => {
                      handleChange(event);
                      setTextLength(event.target.value.length);
                    }}
                    onBlur={handleBlur} />
                </span>
                <div className="help">Tell us about yourself.</div>
              </div>
              <div>
                <div className="label">Website <ErrorMessage name="url">{error}</ErrorMessage></div>
                <span>
                  <Field type="url" name="url" placeholder="https://example.com/" />
                </span>
                <div className="help">If you have a website you want to link to, put it here.</div>
              </div>
              <div>
                <div className="label">Color <ErrorMessage name="color">{error}</ErrorMessage></div>
                <span>
                  <select 
                    title="Color"
                    name="color" 
                    placeholder="https://example.com/"
                    onChange={handleChange}
                    // onChange={(event: FormEvent) => {
                    //   handleChange(event);
                    //   var color = Bloods[PossibleBloods[event.target.value]];
                    //   themeColor(color.colormap.map(x=>x*255)).forEach((x, i) => document.body.style.setProperty("--pos-" + (i * 100), toHex(x)));
                    //   themeColor(color.colormapNeg?.map(x=>x*255) ?? negate(color.colormap.map(x=>x*255))).forEach((x, i) => document.body.style.setProperty("--neg-" + (i * 100), toHex(x)));
                    // }}
                    onBlur={handleBlur}
                  >
                    {Bloods.map((v, i) => <option key={i} value={v.sign} selected={v.sign === "Default"} label={v.sign + " (" + v.name + (v.sign === "Default" ? " / Red" : (" / " + Bloods[(i + 6) % 12].name)) + ")"} />)}
                  </select>
                </span>
                <div className="help">
                  The sign color that your user page inherits.
                  <div className="warning">This page changes color based on this value!</div>
                </div>
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
        <UserRenderer test user={testVals} trolls={[]} pesters={[]} />
      </div>
      <Footer />
    </div>
  )
}