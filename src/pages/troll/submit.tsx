import Box from '@/components/box';
import Navbar from '@/components/nav';
import { brandUrl } from '@/types/assist/branding';
import {
  negate,
  themeColor,
  toHex
} from '@/types/assist/colors';
import {
  Bloods,
  PossibleBloods,
  PronounsList,
  nameParallels
} from '@/types/assist/signs';
import {
  ClientTroll,
  ClientTrollSchema,
  TrollSchema
} from '@/types/troll';
import { Troll as trollType } from '@/types/troll';
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikProps,
  insert
} from 'formik';
import { FormEvent, useState } from 'react';
import * as dbFunctions from '@/lib/dbFunctions';
// import UserRenderer from "@/pages/user/[id]";
import Footer from '@/components/footer';
import { TrollNameRenderer } from '@/components/name';
import { CharacterReference } from '@/types/pester';
import PesterBox from '@/components/pester';
import { ExtendedZodiacIndexes } from '@/types/assist/extendedZodiac';
import { quirkFunctionsDescriptions } from '@/components/functions/text';
import TrollCard from '@/components/trollcard';
import { error } from '@/components/form';

export default function Troll({
  allUsers
}: {
  allUsers: string[];
}) {
  const [testVals, setTestVals] = useState(
    {} as ClientTroll
  );
  const [textLength, setTextLength] = useState(0);
  const [selectedElement, setSelectedElement] = useState(0);
  const [
    selectedPronounElement,
    setSelectedPronounElement
  ] = useState(0);
  return (
    <div className='wide base'>
      <Navbar
        title={module.exports.default.name}
        type='Submit'
      />
      <div className='flex flex-row gap-4 justify-center flex-wrap'>
        <Box
          title={'Submit a ' + module.exports.default.name}
          className='flex-1'
        >
          <Formik
            // @ts-ignore blah
            initialValues={{ quirks: [['default', []]] }}
            validationSchema={ClientTrollSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(
                  JSON.stringify(
                    ClientTrollSchema.validateSync(values),
                    null,
                    2
                  )
                );
                setSubmitting(false);
              }, 2000);
            }}
          >
            {({
              isSubmitting,
              setFieldValue,
              handleChange,
              handleBlur,
              values
            }: FormikProps<ClientTroll>) => (
              <Form>
                <div>
                  <div>
                    Submit a cool character to the TrollCall
                    site!
                  </div>
                </div>
                <div>
                  <FieldArray name='owners'>
                    {({ insert, form, remove, push }) => (
                      <>
                        <div className='label'>
                          Owners{' '}
                          {form.errors.owners &&
                            typeof form.errors.owners ===
                              'string' && (
                              <ErrorMessage name='owners'>
                                {error}
                              </ErrorMessage>
                            )}
                        </div>
                        {values.owners?.map(
                          (owner, index) => (
                            <div key={index}>
                              <div className='tinyLabel'>
                                Owner {index}{' '}
                                {form.errors.owners &&
                                  typeof form.errors
                                    .owners !==
                                    'string' && (
                                    <ErrorMessage
                                      name={`owners[${index}]`}
                                    >
                                      {error}
                                    </ErrorMessage>
                                  )}
                              </div>
                              <span>
                                <Field
                                  onFocus={() =>
                                    setSelectedElement(
                                      index
                                    )
                                  }
                                  type='text'
                                  name={`owners[${index}]`}
                                  placeholder='Johnny Doefor'
                                />
                                <button
                                  type='button'
                                  className='ml-2'
                                  onClick={() =>
                                    remove(index)
                                  }
                                >
                                  Remove User
                                </button>
                                {index > 0 ? (
                                  <button
                                    type='button'
                                    onClick={() => {
                                      remove(index);
                                      insert(
                                        index - 1,
                                        owner
                                      );
                                    }}
                                  >
                                    Up
                                  </button>
                                ) : (
                                  <></>
                                )}
                                {index <
                                // @ts-ignore no
                                values.owners.length - 1 ? (
                                  <button
                                    type='button'
                                    onClick={() => {
                                      remove(index);
                                      insert(
                                        index + 1,
                                        owner
                                      );
                                    }}
                                  >
                                    Down
                                  </button>
                                ) : (
                                  <></>
                                )}
                              </span>
                            </div>
                          )
                        )}
                        <span>
                          <button
                            type='button'
                            className='mt-1'
                            onClick={() => push('')}
                          >
                            Add User
                          </button>
                        </span>
                      </>
                    )}
                  </FieldArray>
                  <div className='bg-neg-200 border-[1px] border-neg-800'>
                    <span className='bg-neg-100 text-neg-900 w-full py-1 px-2'>
                      Matching Owners
                    </span>
                    <div className='max-h-[160px] overflow-y-auto overflow-x-hidden'>
                      {(() => {
                        /* @ts-ignore */
                        var array = allUsers.filter(
                          (v) =>
                            v.includes(
                              values.owners
                                ? values.owners[
                                    selectedElement
                                  ]
                                : ''
                            ) &&
                            v.length ===
                              (values.owners?.length ?? 0)
                        );
                        if (array.length <= 0)
                          return (
                            <span className='bg-neg-200 text-neg-600 w-full py-2 px-2'>
                              None found.
                            </span>
                          );
                        return array.map((v, i) => {
                          var owners = values.owners
                            ? values.owners[selectedElement]
                            : '';
                          var stringPlace =
                            v.indexOf(owners);
                          return (
                            <button
                              type='button'
                              className='inline'
                              onClick={() =>
                                setFieldValue(
                                  `owners[${selectedElement}]`,
                                  v
                                )
                              }
                              key={i}
                            >
                              {v.substring(0, stringPlace)}
                              <b>{owners}</b>
                              {v.substring(
                                owners.length + stringPlace,
                                v.length
                              )}
                            </button>
                          );
                        });
                      })()}
                    </div>
                  </div>
                  <div className='help'>
                    A list of people who own or have
                    contributed to your character. First
                    index is always the owner.
                  </div>
                </div>
                <div>
                  <div className='label'>
                    Name{' '}
                    <ErrorMessage name='name.first'>
                      {error}
                    </ErrorMessage>{' '}
                    <ErrorMessage name='name.last'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span className='input'>
                    <Field
                      type='text'
                      name='name.first'
                      placeholder='Johnny'
                      onBlur={(event: FormEvent) => {
                        handleBlur(event);
                        setFieldValue(
                          'id',
                          // @ts-ignore smh
                          event.target.value
                            .replace(/[^a-zA-Z0-9-_]/g, '_')
                            .toLowerCase()
                        );
                      }}
                    />
                    <Field
                      type='text'
                      name='name.last'
                      placeholder='Doefor'
                    />
                  </span>
                  <div className='help'>
                    The name that displays on your
                    character&apos;s casting card.
                  </div>
                </div>
                <div>
                  <div className='label'>
                    Pronunciation{' '}
                    <ErrorMessage name='pronunciation.first'>
                      {error}
                    </ErrorMessage>{' '}
                    <ErrorMessage name='pronunciation.last'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span className='input'>
                    <Field
                      type='text'
                      name='pronunciation.first'
                      placeholder='john-knee'
                    />
                    <Field
                      type='text'
                      name='pronunciation.last'
                      placeholder='doe-fur'
                    />
                  </span>
                  <div className='help'>
                    A piece of text that helps people
                    pronounce your character&apos;s name.
                  </div>
                </div>
                <div>
                  <div className='label'>
                    User ID{' '}
                    <ErrorMessage name='id'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span className='input'>
                    {brandUrl}troll/
                    <Field
                      type='text'
                      name='id'
                      placeholder='jaynne_johnny'
                      onBlur={(event: FormEvent) => {
                        handleBlur(event);
                        setFieldValue(
                          'id',
                          // @ts-ignore smh
                          event.target.value
                            .replace(/[^a-zA-Z0-9-_]/g, '_')
                            .toLowerCase()
                        );
                      }}
                    />
                  </span>
                  <div className='help'>
                    User ID will update based on first name,
                    but you can always set one manually.
                    It&apos;s also good practice to put a
                    signature before the User ID, like{' '}
                    <b>meowcatheorange_keelez</b>.
                  </div>
                </div>
                <div>
                  <div className='label'>
                    Username{' '}
                    <ErrorMessage name='username'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span>
                    <Field
                      type='text'
                      name='username'
                      placeholder='genericExamples'
                    />
                  </span>
                  <div className='help'>
                    Your character&apos;s Trollian-style
                    username.
                    {(() => {
                      var name = TrollNameRenderer(
                        {
                          // @ts-ignore L + ratio + dont care
                          character: {
                            username:
                              values.username ??
                              'genericExamples'
                          }
                        },
                        false,
                        true,
                        false
                      ) as string;
                      return nameParallels[name] ? (
                        <div className='warning'>
                          This username may conflict with
                          the name of {nameParallels[name]}.
                        </div>
                      ) : (
                        <></>
                      );
                    })()}
                  </div>
                  <PesterBox
                    pesterJSON={{
                      characters: [
                        {
                          character: {
                            username:
                              values.username ??
                              'genericExamples',
                            sign: values.sign ?? {
                              color: 0
                            },
                            // @ts-ignore L + ratio + dont care
                            quirks: Object.fromEntries(
                              // @ts-ignore FUCK IDK IM TOO SLOW TO GET THIS ERROR
                              values.quirks
                            ) ?? { default: [] }
                          }
                        },
                        {
                          // @ts-ignore L + ratio + dont care
                          character: {
                            username: 'pesterlogTester',
                            sign: {
                              color: 6,
                              extended: 'Libra'
                            },
                            quirks: { default: [] }
                          }
                        }
                      ],
                      log: [
                        // @ts-ignore
                        {
                          character: 0,
                          text: 'Hello, world!'
                        },
                        // @ts-ignore
                        {
                          character: 1,
                          text: 'Hello, [C0S]!'
                        },
                        // @ts-ignore
                        {
                          character: 0,
                          text: 'You can call me [C0U].'
                        }
                      ]
                    }}
                  />
                </div>
                <div>
                  <div className='label'>
                    Description ({textLength}/1000){' '}
                    <ErrorMessage name='description'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span>
                    <textarea
                      name='description'
                      placeholder='Lorem ipsum dolor sit amet...'
                      cols={32}
                      onChange={(event: FormEvent) => {
                        handleChange(event);
                        setTextLength(
                          // @ts-ignore smh
                          event.target.value.length
                        );
                      }}
                      onBlur={handleBlur}
                    />
                  </span>
                  <div className='help'>
                    Tell us about your character. Minimum
                    100 characters.
                  </div>
                </div>
                <div>
                  <div className='label'>
                    Age{' '}
                    <ErrorMessage name='age'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <div className='tinyLabel'>
                    Age (Sweeps)
                  </div>
                  <span>
                    <Field
                      type='number'
                      name='age'
                      placeholder='6'
                      onChange={(e: Event) => {
                        handleChange(e);
                        setFieldValue(
                          'ageyears',
                          Math.round(
                            // @ts-ignore smh
                            e.target.value *
                              2.16666666667 *
                              10
                          ) / 10
                        );
                      }}
                    />
                  </span>
                  <div className='help'>
                    Your character&apos;s age in Alternian
                    solar sweeps.
                  </div>
                  <div className='tinyLabel'>
                    Age (Years)
                  </div>
                  <span>
                    <Field
                      type='number'
                      name='ageyears'
                      placeholder='13'
                      onChange={(e: Event) => {
                        handleChange(e);
                        setFieldValue(
                          'age',
                          Math.round(
                            // @ts-ignore smh
                            (e.target.value /
                              2.16666666667) *
                              100
                          ) / 100
                        );
                      }}
                    />
                  </span>
                  <div className='help'>
                    Your character&apos;s age in years.
                  </div>
                </div>
                <div>
                  <div className='label'>
                    True Sign{' '}
                    <ErrorMessage name='sign.extended'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span>
                    <select
                      title='true sign'
                      name='sign.extended'
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue(
                          'sign.color',
                          Math.floor(
                            e.target?.selectedIndex / 24
                          )
                        );
                      }}
                      onBlur={handleBlur}
                    >
                      {Object.entries(
                        ExtendedZodiacIndexes
                      ).map((theArray, primaryidx) => (
                        <>
                          {theArray[1].map((v, i) => (
                            <option
                              key={primaryidx + '.' + i}
                              value={v}
                              label={
                                v === theArray[0]
                                  ? `-- ${v} --`
                                  : v
                              }
                            />
                          ))}
                        </>
                      ))}
                    </select>
                  </span>
                  <div className='help'>
                    The True Sign your character was given.
                    {values.sign?.fakeColor ? (
                      <></>
                    ) : (
                      <div className='warning'>
                        This page changes color based on
                        this value!
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className='label'>
                    Fake Sign{' '}
                    <ErrorMessage name='sign.fakeColor'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span>
                    <select
                      title='sign fake color'
                      name='sign.fakeColor'
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option
                        value={undefined}
                        label='None'
                      />
                      {Bloods.map((v, i) => (
                        <option
                          key={i}
                          value={i}
                          label={
                            v.sign + ' (' + v.name + ')'
                          }
                        />
                      ))}
                    </select>
                  </span>
                  <div className='help'>
                    The sign class that your character masks
                    as.
                    {values.sign?.fakeColor ? (
                      <div className='warning'>
                        This page changes color based on
                        this value!
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div>
                  <div className='label'>
                    Species{' '}
                    <ErrorMessage name='species'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span>
                    <Field
                      type='text'
                      name='species'
                      defaultValue='Troll'
                      placeholder='...'
                    />
                  </span>
                  <div className='help'>
                    Your character&apos;s sub-species of
                    troll. Should either be <b>Troll</b> or{' '}
                    <b>Troll-[something]</b>.
                  </div>
                </div>
                <div>
                  <div className='label'>
                    Pronouns{' '}
                    <ErrorMessage name='pronouns'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <FieldArray name='pronouns'>
                    {({ insert, remove, push }) => (
                      <>
                        {values.pronouns?.map(
                          (pronoun, index) => (
                            <>
                              <div className='tinyLabel'>
                                Pronoun Set {index}{' '}
                                <ErrorMessage
                                  name={`pronouns[${index}]`}
                                >
                                  {error}
                                </ErrorMessage>
                              </div>
                              <span key={index}>
                                <Field
                                  onFocus={() =>
                                    setSelectedPronounElement(
                                      index
                                    )
                                  }
                                  type='text'
                                  name={`pronouns[${index}]`}
                                  placeholder='they/them'
                                />
                                <button
                                  type='button'
                                  className='ml-2'
                                  onClick={() =>
                                    remove(index)
                                  }
                                >
                                  Remove Set
                                </button>
                                {index > 0 ? (
                                  <button
                                    type='button'
                                    onClick={() => {
                                      remove(index);
                                      insert(
                                        index - 1,
                                        pronoun
                                      );
                                    }}
                                  >
                                    Up
                                  </button>
                                ) : (
                                  <></>
                                )}
                                {index <
                                values.pronouns.length -
                                  1 ? (
                                  <button
                                    type='button'
                                    onClick={() => {
                                      remove(index);
                                      insert(
                                        index + 1,
                                        pronoun
                                      );
                                    }}
                                  >
                                    Down
                                  </button>
                                ) : (
                                  <></>
                                )}
                              </span>
                            </>
                          )
                        )}
                        <span>
                          <button
                            type='button'
                            className='mt-1'
                            onClick={() => push('')}
                          >
                            Add Pronouns
                          </button>
                        </span>
                      </>
                    )}
                  </FieldArray>
                  <div className='bg-neg-200 border-[1px] border-neg-800'>
                    <span className='bg-neg-100 text-neg-900 w-full py-1 px-2'>
                      Matching Common Pronouns
                    </span>
                    <div className='max-h-[160px] overflow-y-auto overflow-x-hidden'>
                      {(() => {
                        /* @ts-ignore */
                        var array = PronounsList.filter(
                          (v) =>
                            v.includes(
                              values.pronouns
                                ? values.pronouns[
                                    selectedPronounElement
                                  ]
                                : ''
                            )
                        );
                        if (array.length <= 0)
                          return (
                            <span className='bg-neg-200 text-neg-600 w-full py-2 px-2'>
                              None found.
                            </span>
                          );
                        return array.map((v, i) => {
                          var pronouns = values.pronouns
                            ? values.pronouns[
                                selectedPronounElement
                              ]
                            : '';
                          /* @ts-ignore */
                          var stringPlace =
                            v.indexOf(pronouns);
                          return (
                            <button
                              type='button'
                              className='inline'
                              onClick={() =>
                                setFieldValue(
                                  `pronouns[${selectedPronounElement}]`,
                                  v
                                )
                              }
                              key={i}
                            >
                              {v.substring(0, stringPlace)}
                              <b>{pronouns}</b>
                              {v.substring(
                                pronouns.length +
                                  stringPlace,
                                v.length
                              )}
                            </button>
                          );
                        });
                      })()}
                    </div>
                  </div>
                  <div className='help'>
                    A list of pronouns your character goes
                    by.
                  </div>
                </div>
                <div>
                  <div className='label'>
                    Gender{' '}
                    <ErrorMessage name='gender'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span>
                    <Field
                      type='text'
                      name='gender'
                      placeholder='Male'
                    />
                  </span>
                  <div className='help'>
                    Your character&apos;s identified gender.
                  </div>
                </div>
                <div>
                  <div className='label'>
                    Height{' '}
                    <ErrorMessage name='height'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <div className='tinyLabel'>
                    Height (Inches)
                  </div>
                  <span>
                    <Field
                      type='number'
                      name='height'
                      placeholder='63'
                      onChange={(e: Event) => {
                        handleChange(e);
                        setFieldValue(
                          'heightmeters',
                          Math.round(
                            // @ts-ignore smh
                            (e.target.value / 39.37) * 10
                          ) / 10
                        );
                      }}
                    />
                  </span>
                  <div className='help'>
                    Your character&apos;s height in inches.
                  </div>
                  <div className='tinyLabel'>
                    Height (Meters)
                  </div>
                  <span>
                    <Field
                      type='number'
                      name='heightmeters'
                      placeholder='1.6'
                      onChange={(e: Event) => {
                        handleChange(e);
                        setFieldValue(
                          'height',
                          Math.round(
                            // @ts-ignore smh
                            e.target.value * 39.37 * 10
                          ) / 10
                        );
                      }}
                    />
                  </span>
                  <div className='help'>
                    Your character&apos;s height in meters.
                  </div>
                </div>
                <div>
                  <div className='label'>
                    Colors{' '}
                    <ErrorMessage name='colors'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <FieldArray name='colors'>
                    {({ insert, remove, push }) => (
                      <>
                        {values.colors?.map(
                          (color, index) => (
                            <>
                              <div className='tinyLabel'>
                                Color {index}{' '}
                                <ErrorMessage
                                  name={`colors[${index}]`}
                                >
                                  {error}
                                </ErrorMessage>
                              </div>
                              <span key={index}>
                                <Field
                                  type='color'
                                  name={`colors[${index}]`}
                                />
                                <button
                                  type='button'
                                  className='ml-2'
                                  onClick={() =>
                                    remove(index)
                                  }
                                >
                                  Remove Color
                                </button>
                                {index > 0 ? (
                                  <button
                                    type='button'
                                    onClick={() => {
                                      remove(index);
                                      insert(
                                        index - 1,
                                        color
                                      );
                                    }}
                                  >
                                    Up
                                  </button>
                                ) : (
                                  <></>
                                )}
                                {index <
                                values.colors.length - 1 ? (
                                  <button
                                    type='button'
                                    onClick={() => {
                                      remove(index);
                                      insert(
                                        index + 1,
                                        color
                                      );
                                    }}
                                  >
                                    Down
                                  </button>
                                ) : (
                                  <></>
                                )}
                              </span>
                            </>
                          )
                        )}
                        <span>
                          <button
                            type='button'
                            className='mt-1'
                            onClick={() => push('')}
                          >
                            Add Color
                          </button>
                        </span>
                      </>
                    )}
                  </FieldArray>
                  <div className='help'>
                    A general color palette for artist
                    reference.
                  </div>
                </div>
                <div>
                  <div className='label'>Policies</div>
                  <div className='tinyLabel'>
                    Fanart{' '}
                    <ErrorMessage name='policies.fanart'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span>
                    <select
                      title='fanart'
                      name='policies.fanart'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue='no'
                    >
                      <option
                        value='yes'
                        label='Yes'
                      />
                      <option
                        value='ask'
                        label='Ask me'
                      />
                      <option
                        value='no'
                        label='No'
                      />
                    </select>
                  </span>
                  <div className='help'>
                    Do you allow fanart of your character?
                  </div>
                  <div className='tinyLabel'>
                    Fanart with other characters{' '}
                    <ErrorMessage name='policies.fanartOthers'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span>
                    <select
                      title='fanartOthers'
                      name='policies.fanartOthers'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue='no'
                    >
                      <option
                        value='yes'
                        label='Yes'
                      />
                      <option
                        value='ask'
                        label='Ask me'
                      />
                      <option
                        value='no'
                        label='No'
                      />
                    </select>
                  </span>
                  <div className='help'>
                    Do you allow fanart of your character
                    with other characters?
                  </div>
                  <div className='tinyLabel'>
                    Kinning{' '}
                    <ErrorMessage name='policies.kinning'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span>
                    <select
                      title='kinning'
                      name='policies.kinning'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue='no'
                    >
                      <option
                        value='yes'
                        label='Yes'
                      />
                      <option
                        value='ask'
                        label='Ask me'
                      />
                      <option
                        value='no'
                        label='No'
                      />
                    </select>
                  </span>
                  <div className='help'>
                    Do you allow kinning of your character?
                  </div>
                  <div className='tinyLabel'>
                    Shipping{' '}
                    <ErrorMessage name='policies.shipping'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span>
                    <select
                      title='shipping'
                      name='policies.shipping'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue='no'
                    >
                      <option
                        value='yes'
                        label='Yes'
                      />
                      <option
                        value='ask'
                        label='Ask me'
                      />
                      <option
                        value='no'
                        label='No'
                      />
                    </select>
                  </span>
                  <div className='help'>
                    Do you allow shipping of your character?
                  </div>
                  <div className='tinyLabel'>
                    Fanfiction{' '}
                    <ErrorMessage name='policies.fanfiction'>
                      {error}
                    </ErrorMessage>
                  </div>
                  <span>
                    <select
                      title='fanfiction'
                      name='policies.fanfiction'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue='no'
                    >
                      <option
                        value='yes'
                        label='Yes'
                      />
                      <option
                        value='ask'
                        label='Ask me'
                      />
                      <option
                        value='no'
                        label='No'
                      />
                    </select>
                  </span>
                  <div className='help'>
                    Do you allow fanfiction including your
                    character?
                  </div>
                </div>
                <div>
                  <FieldArray name='preferences'>
                    {({ insert, form, remove, push }) => (
                      <>
                        <div className='label'>
                          Preferences{' '}
                          {form.errors.preferences &&
                            typeof form.errors
                              .preferences !== 'object' && (
                              <ErrorMessage
                                name={`preferences`}
                              >
                                {error}
                              </ErrorMessage>
                            )}
                        </div>
                        {values.preferences?.map(
                          (preference, index) => (
                            <>
                              <div className='tinyLabel'>
                                Preference {index}{' '}
                                {form.errors.preferences &&
                                  typeof form.errors
                                    .preferences ===
                                    'object' && (
                                    <>
                                      <ErrorMessage
                                        name={`preferences[${index}].thing`}
                                      >
                                        {error}
                                      </ErrorMessage>{' '}
                                      <ErrorMessage
                                        name={`preferences[${index}].opinion`}
                                      >
                                        {error}
                                      </ErrorMessage>
                                    </>
                                  )}
                              </div>
                              <span key={index}>
                                <Field
                                  type='text'
                                  name={`preferences[${index}].thing`}
                                />
                                <select
                                  title='opinion'
                                  name={`preferences[${index}].opinion`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option
                                    value='true'
                                    label='♥ (Likes)'
                                  />
                                  <option
                                    value='false'
                                    label='♠ (Hates)'
                                  />
                                </select>
                              </span>
                              <span>
                                <button
                                  type='button'
                                  className='ml-2'
                                  onClick={() =>
                                    remove(index)
                                  }
                                >
                                  Remove Preference
                                </button>
                                {index > 0 ? (
                                  <button
                                    type='button'
                                    onClick={() => {
                                      remove(index);
                                      insert(
                                        index - 1,
                                        preference
                                      );
                                    }}
                                  >
                                    Up
                                  </button>
                                ) : (
                                  <></>
                                )}
                                {index <
                                values.preferences.length -
                                  1 ? (
                                  <button
                                    type='button'
                                    onClick={() => {
                                      remove(index);
                                      insert(
                                        index + 1,
                                        preference
                                      );
                                    }}
                                  >
                                    Down
                                  </button>
                                ) : (
                                  <></>
                                )}
                              </span>
                            </>
                          )
                        )}
                        <span>
                          <button
                            type='button'
                            className='mt-1'
                            onClick={() =>
                              push({
                                opinion: true,
                                thing: ''
                              })
                            }
                          >
                            Add Preference
                          </button>
                        </span>
                      </>
                    )}
                  </FieldArray>
                  <div className='help'>
                    A list of things your character
                    loves/hates.
                  </div>
                </div>
                <div>
                  <FieldArray name='facts'>
                    {({ insert, form, remove, push }) => (
                      <>
                        <div className='label'>
                          Facts{' '}
                          {form.errors.facts &&
                            typeof form.errors.facts ===
                              'string' && (
                              <ErrorMessage name={`facts`}>
                                {error}
                              </ErrorMessage>
                            )}
                        </div>
                        {values.facts?.map(
                          (fact, index) => (
                            <>
                              <div className='tinyLabel'>
                                Fact {index}{' '}
                                {form.errors.facts &&
                                  typeof form.errors
                                    .facts !== 'string' && (
                                    <ErrorMessage
                                      name={`facts[${index}]`}
                                    >
                                      {error}
                                    </ErrorMessage>
                                  )}
                              </div>
                              <span key={index}>
                                <Field
                                  type='text'
                                  name={`facts[${index}]`}
                                />
                              </span>
                              <span>
                                <button
                                  type='button'
                                  className='ml-2'
                                  onClick={() =>
                                    remove(index)
                                  }
                                >
                                  Remove Fact
                                </button>
                                {index > 0 ? (
                                  <button
                                    type='button'
                                    onClick={() => {
                                      remove(index);
                                      insert(
                                        index - 1,
                                        fact
                                      );
                                    }}
                                  >
                                    Up
                                  </button>
                                ) : (
                                  <></>
                                )}
                                {index <
                                values.facts.length - 1 ? (
                                  <button
                                    type='button'
                                    onClick={() => {
                                      remove(index);
                                      insert(
                                        index + 1,
                                        fact
                                      );
                                    }}
                                  >
                                    Down
                                  </button>
                                ) : (
                                  <></>
                                )}
                              </span>
                            </>
                          )
                        )}
                        <span>
                          <button
                            type='button'
                            className='mt-1'
                            onClick={() => push('')}
                          >
                            Add Fact
                          </button>
                        </span>
                      </>
                    )}
                  </FieldArray>
                  <div className='help'>
                    A list of blurbs describing your
                    character.
                  </div>
                </div>
                <div>
                  <FieldArray name='quirks'>
                    {({ form, remove, push }) => (
                      <>
                        <div className='label'>
                          Quirk Modes{' '}
                          {form.errors.quirks &&
                            typeof form.errors.quirks ===
                              'string' && (
                              <ErrorMessage name={`quirks`}>
                                {error}
                              </ErrorMessage>
                            )}
                        </div>
                        {values.quirks === undefined ? (
                          <></>
                        ) : (
                          values.quirks?.map(
                            (quirk: any, index: number) => (
                              <>
                                <span
                                  key={index}
                                  className='ml-2'
                                >
                                  <div className='label'>
                                    Quirk: {quirk[0]}
                                  </div>
                                  <Field
                                    type='text'
                                    name={`quirks[${index}][0]`}
                                  />
                                  <FieldArray
                                    name={`quirks[${index}][1]`}
                                  >
                                    {({
                                      remove,
                                      push,
                                      insert
                                    }) => (
                                      <>
                                        <div className='ml-2 my-2'>
                                          {values.quirks ===
                                          undefined ? (
                                            <></>
                                          ) : (
                                            values.quirks[
                                              index
                                            ][1]?.map(
                                              (
                                                func: {
                                                  function: string;
                                                  arguments: any[];
                                                },
                                                qm_index: number
                                              ) => (
                                                <>
                                                  <div className='tinyLabel'>
                                                    Quirk
                                                    Function{' '}
                                                    {
                                                      qm_index
                                                    }
                                                  </div>
                                                  <span>
                                                    <Field
                                                      type='text'
                                                      name={`quirks[${index}][1][${qm_index}].function`}
                                                    />
                                                  </span>
                                                  <div className='help whitespace-pre-line mt-2'>
                                                    {quirkFunctionsDescriptions[
                                                      func
                                                        .function
                                                    ] ?? ''}
                                                  </div>
                                                  <div className='tinyLabel'>
                                                    Arguments
                                                  </div>
                                                  <div
                                                    key={
                                                      qm_index
                                                    }
                                                    className='ml-2 my-2'
                                                  >
                                                    <FieldArray
                                                      name={`quirks[${index}][1][${qm_index}].arguments`}
                                                    >
                                                      {({
                                                        remove,
                                                        push,
                                                        insert
                                                      }) => (
                                                        <>
                                                          <div className='ml-2 mb-2'>
                                                            {values.quirks ===
                                                            undefined ? (
                                                              <>

                                                              </>
                                                            ) : (
                                                              values.quirks[
                                                                index
                                                              ][1][
                                                                qm_index
                                                              ].arguments?.map(
                                                                (
                                                                  arg: any[],
                                                                  arg_qm_index: number
                                                                ) => (
                                                                  <>
                                                                    <div className='tinyLabel'>
                                                                      Argument{' '}
                                                                      {
                                                                        arg_qm_index
                                                                      }
                                                                    </div>
                                                                    <span>
                                                                      <Field
                                                                        type='text'
                                                                        name={`quirks[${index}][1][${qm_index}].arguments[${arg_qm_index}]`}
                                                                      />
                                                                    </span>
                                                                    <span>
                                                                      <button
                                                                        type='button'
                                                                        className='ml-2'
                                                                        onClick={() =>
                                                                          remove(
                                                                            arg_qm_index
                                                                          )
                                                                        }
                                                                      >
                                                                        Remove
                                                                        Argument
                                                                      </button>
                                                                      {arg_qm_index >
                                                                      0 ? (
                                                                        <button
                                                                          type='button'
                                                                          onClick={() => {
                                                                            remove(
                                                                              arg_qm_index
                                                                            );
                                                                            insert(
                                                                              arg_qm_index -
                                                                                1,
                                                                              arg
                                                                            );
                                                                          }}
                                                                        >
                                                                          Up
                                                                        </button>
                                                                      ) : (
                                                                        <>

                                                                        </>
                                                                      )}
                                                                      {arg_qm_index <
                                                                      // @ts-ignore too tired to deal with this
                                                                      values
                                                                        .quirks[
                                                                        index
                                                                      ][1][
                                                                        qm_index
                                                                      ]
                                                                        .arguments
                                                                        .length -
                                                                        1 ? (
                                                                        <button
                                                                          type='button'
                                                                          onClick={() => {
                                                                            remove(
                                                                              arg_qm_index
                                                                            );
                                                                            insert(
                                                                              arg_qm_index +
                                                                                1,
                                                                              arg
                                                                            );
                                                                          }}
                                                                        >
                                                                          Down
                                                                        </button>
                                                                      ) : (
                                                                        <>

                                                                        </>
                                                                      )}
                                                                    </span>
                                                                  </>
                                                                )
                                                              )
                                                            )}
                                                          </div>
                                                          <span>
                                                            <button
                                                              type='button'
                                                              className='mt-1'
                                                              onClick={() =>
                                                                push(
                                                                  ''
                                                                )
                                                              }
                                                            >
                                                              Add
                                                              Argument
                                                            </button>
                                                          </span>
                                                        </>
                                                      )}
                                                    </FieldArray>
                                                  </div>
                                                  <span>
                                                    <button
                                                      type='button'
                                                      className='ml-2'
                                                      onClick={() =>
                                                        remove(
                                                          qm_index
                                                        )
                                                      }
                                                    >
                                                      Remove
                                                      Quirk
                                                      Function
                                                    </button>
                                                    {qm_index >
                                                    0 ? (
                                                      <button
                                                        type='button'
                                                        onClick={() => {
                                                          remove(
                                                            qm_index
                                                          );
                                                          insert(
                                                            qm_index -
                                                              1,
                                                            func
                                                          );
                                                        }}
                                                      >
                                                        Up
                                                      </button>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {qm_index <
                                                    // @ts-ignore too tired to deal with this
                                                    values
                                                      .quirks[
                                                      index
                                                    ][1]
                                                      .length -
                                                      1 ? (
                                                      <button
                                                        type='button'
                                                        onClick={() => {
                                                          remove(
                                                            qm_index
                                                          );
                                                          insert(
                                                            qm_index +
                                                              1,
                                                            func
                                                          );
                                                        }}
                                                      >
                                                        Down
                                                      </button>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                </>
                                              )
                                            )
                                          )}
                                        </div>
                                        <span>
                                          <button
                                            type='button'
                                            className='mt-1'
                                            onClick={() =>
                                              push({
                                                function:
                                                  '',
                                                arguments:
                                                  []
                                              })
                                            }
                                          >
                                            Add Quirk
                                            Function
                                          </button>
                                        </span>
                                      </>
                                    )}
                                  </FieldArray>
                                </span>
                                <span>
                                  <button
                                    type='button'
                                    className='ml-2'
                                    onClick={() =>
                                      remove(index)
                                    }
                                  >
                                    Remove Quirk Mode
                                  </button>
                                </span>
                              </>
                            )
                          )
                        )}
                        <span>
                          <button
                            type='button'
                            className='mt-1'
                            onClick={() => push(['', []])}
                          >
                            Add Quirk Mode
                          </button>
                        </span>
                      </>
                    )}
                  </FieldArray>
                  <div className='help'>
                    A list of text replacements for your
                    character&apos;s quirk. <b>default</b>{' '}
                    quirk is required.
                  </div>
                </div>
                <div>
                  <div className='label'>Preview</div>
                  <TrollCard
                    //@ts-ignore fuck it
                    troll={testVals}
                    simple={false}
                  />
                </div>
                <div>
                  <span className='submitRight'>
                    <Field
                      type='button'
                      value='Preview'
                      disabled={isSubmitting}
                      onClick={() => {
                        setTestVals(values);
                      }}
                    />
                    <Field
                      type='submit'
                      value='Submit'
                      disabled={isSubmitting}
                    />
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  // @ts-ignore Go fuck yourself, JavaScript
  const findAll = (await dbFunctions.default).findAll;

  var rau = await findAll('users');
  return {
    props: { allUsers: rau } // will be passed to the page component as props
  };
}
