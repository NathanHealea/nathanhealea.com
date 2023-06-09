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
          {/* 🦄 Tier */}

          <div className='flex flex-col justify-center items-center border-strawberry border-2 rounded-lg p-4 bg-strawberry/10 relative space-y-4'>
            <p className='w-32 text-white rounded-md text-center absolute -top-3 left-4 bg-strawberry'>
              🦄 Tier
            </p>
            <div className='flex flex-row  items-center space-x-2 w-full max-w-[256px]'>
              <div className=' flex justify-center w-12'>
                <SimpleIcon
                  name='JavaScript'
                  slug='javascript'
                  color='strawberry'
                />
              </div>

              <p className='w-full text-center'>JavaScript</p>
            </div>
            <div className='flex flex-row  items-center space-x-2 w-full max-w-[256px]'>
              <div className=' flex justify-center w-12'>
                <SimpleIcon
                  name='TypeScript'
                  slug='typescript'
                  color='strawberry'
                />
              </div>

              <p className='w-full text-center'>TypeScript</p>
            </div>
            <div className='flex flex-row  items-center space-x-2 w-full max-w-[256px]'>
              <div className=' flex justify-center w-12'>
                <SimpleIcon name='React' slug='react' color='strawberry' />
              </div>

              <p className='w-full text-center'>ReactJS</p>
            </div>
            <div className='flex flex-row  items-center space-x-2 w-full max-w-[256px]'>
              <div className=' flex justify-center w-12'>
                <SimpleIcon
                  name='TailwindCSS'
                  slug='tailwindcss'
                  color='strawberry'
                />
              </div>

              <p className='w-full text-center'>Tailwind </p>
            </div>

            <div className='flex flex-row  items-center space-x-2 w-full max-w-[256px]'>
              <div className=' flex justify-center w-12'>
                <SimpleIcon name='NextS' slug='nextdotjs' color='strawberry' />
              </div>

              <p className='w-full text-center'>NextJS</p>
            </div>
          </div>

          {/* ✨ Tier */}
          <div className='flex flex-col justify-center items-center border-apricot border-2 rounded-lg p-4 bg-apricot/10 relative space-y-4'>
            <p className='w-32 text-white rounded-md text-center absolute -top-3 left-4 bg-apricot'>
              ✨ Tier
            </p>
            <div className='flex flex-row  items-center space-x-2 w-full max-w-[256px]'>
              <div className=' flex justify-center w-12'>
                <SimpleIcon name='C#' slug='csharp' color='apricot' />
              </div>

              <p className='w-full text-center'>C#</p>
            </div>
            <div className='flex flex-row  items-center space-x-2 w-full max-w-[256px]'>
              <div className=' flex justify-center w-12'>
                <SimpleIcon name='.NET' slug='dotnet' color='apricot' />
              </div>

              <p className='w-full text-center'>.NET</p>
            </div>
            <div className='flex flex-row  items-center space-x-2 w-full max-w-[256px]'>
              <div className=' flex justify-center w-12'>
                <SimpleIcon name='express' slug='express' color='apricot' />
              </div>

              <p className='w-full text-center'>ExpressJS</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LanguagesAndFrameworksPage;
