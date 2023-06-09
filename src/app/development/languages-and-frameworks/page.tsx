import technologies from './page.data';
import SimpleIcon from 'components/SimpleIcon';
import { Metadata } from 'next';
import Link from 'next/link';

interface LanguagesAndFrameworksPageProps {}

const PAGE_TITLE = 'Languages and Frameworks List';
const PAGE_DESCRIPTION =
  'My personal language and framework ranking list, complete with pros, cons, and thoughts. ';

export const metadata: Metadata = {
  title: `Nathan Healea - ${PAGE_TITLE}`,
  description: PAGE_DESCRIPTION,
};

const LanguagesAndFrameworksPage = (props: LanguagesAndFrameworksPageProps) => {
  return (
    <>
      <main className='flex flex-col flex-1 justify-center items-center'>
        <div className='content flex flex-col space-y-32'>
          {technologies.map((technologyGroup, index) => {
            const { color } = technologyGroup;
            return (
              <div
                key={index}
                className={`flex flex-col justify-center items-center border-${color} border-2 rounded-lg p-4 bg-${color}/10 relative space-y-4`}
              >
                <p
                  className={`w-32 p-2 text-white rounded-md text-center absolute  -top-6 left-4 bg-black  border-${color} border-2`}
                >
                  {technologyGroup.name}
                </p>
                {technologyGroup.list.map((technology, index) => {
                  let technologyColor = technology.color || color;
                  return (
                    <div
                      key={`${technology.icon}-${index}`}
                      className='flex flex-row  items-center space-x-2 w-full max-w-[256px]'
                    >
                      <div className=' flex justify-center w-12'>
                        {technology.icon && (
                          <SimpleIcon
                            name={technology.name}
                            slug={technology.icon}
                            color={technologyColor}
                          />
                        )}
                      </div>
                      <p className='w-full text-center'>{technology.name}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default LanguagesAndFrameworksPage;
