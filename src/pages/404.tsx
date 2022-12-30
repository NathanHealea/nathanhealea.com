import { Head } from 'components';
import MainLayout from 'layouts/Main';
import { NextPage } from 'next.types';
import Link from 'next/link';

interface NotFoundPageProps {}

const NotFoundPage: NextPage<NotFoundPageProps> = (props) => {
  return (
    <>
      <Head title='OOPS! This is awkward.' />
      <main className='flex  flex-col flex-1 justify-center items-center'>
        <div className=' max-w-7xl mx-auto flex flex-col text-center gap-y-4'>
          <h1>Well this is awkward 😳</h1>
          <h3 className='text-overline'>
            It appears I have not created the page you are looking for.
          </h3>
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

NotFoundPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default NotFoundPage;
