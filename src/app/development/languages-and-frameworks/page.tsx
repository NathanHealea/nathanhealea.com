import { Metadata, NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

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
        <div className=' max-w-7xl mx-auto flex flex-col text-center gap-y-4'>
          <h1>✨ Coming Soon ✨</h1>
          <h3 className='text-overline'>{PAGE_TITLE}.</h3>
          <p>{PAGE_DESCRIPTION}</p>

          <p>Lets try one of these links ⛛</p>
          <div className='flex flex-col justify-center items-center gap-x-4'>
            <Link href='/' className='btn btn-outlined btn-strawberry'>
              Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default LanguagesAndFrameworksPage;
