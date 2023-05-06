import { themeColor, toHex } from '@/types/assist/colors';
import Box from '@/components/box';
import Navbar from '@/components/nav';
import * as dbFunctions from '@/lib/dbFunctions';
import { GetStaticPropsContext } from 'next/types';
import { Pesterlog as pesterType } from '@/types/pester';
import Footer from '@/components/footer';
import TrollCard from '@/components/trollcard';
import PesterBox from '@/components/pester';
import UsernameRenderer from '@/components/name';
import { User as userType } from '@/types/user';

export default function Trolllog({
  pester
}: {
  pester: pesterType;
}) {
  let theme: { [key: string]: string } = {};
  themeColor('#FF0000').forEach(
    (x, i) => (theme['--pos-' + i * 100] = toHex(x))
  );
  return (
    <div className='base'>
      <Navbar
        title={pester.name}
        type={module.exports.default.name}
      />
      <Box title={pester.name}>
        <p className='py-1'>
          <span>
            Created {new Date(pester.date).toLocaleString()}
          </span>
          <br />
          <span>
            by{' '}
            {pester.owners.map((user: userType, i) => (
              <>
                {i > 0 ? ' and ' : ''}
                <UsernameRenderer
                  link
                  key={i}
                  name
                  user={user}
                />
              </>
            ))}
          </span>
        </p>
        <Box className='negative noborder font-mono whitespace-pre-line'>
          {pester.description.replace(/\\n/gm, '\n')}
        </Box>
      </Box>
      <Box
        style={theme}
        title={'Trolllog'}
        subtitle
      >
        <PesterBox pesterJSON={pester} />
      </Box>
      <Box
        title={'Trollslum'}
        subtitle
      >
        <div className='noshow flex-row flex-wrap justify-around'>
          {pester.characters
            .map((x, i) => (
              <TrollCard
                troll={x.character}
                key={i}
                simple={true}
              />
            ))
            .reverse()}
        </div>
      </Box>
      <Footer />
    </div>
  );
}
export async function getStaticPaths() {
  // @ts-ignore Go fuck yourself, JavaScript
  const findAll = (await dbFunctions.default).findAll;
  const bruh = await findAll('pesters');
  const paths = bruh.map((x: string) => ({
    params: { id: x }
  }));
  return {
    paths,
    fallback: false // can also be true or 'blocking'
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
) {
  // @ts-ignore Go fuck yourself, JavaScript
  const findOne = (await dbFunctions.default).findOne;
  let cpi: string | undefined = context.params
    ?.id as string;
  if (cpi === undefined)
    return {
      notFound: true
    };

  var rp = await findOne('pesters', cpi);

  return {
    props: {
      pester: rp
    }
  };
}
