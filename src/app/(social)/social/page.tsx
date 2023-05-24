import {
  faGithub,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import Image from 'next/image';

interface SocialPageProps {}

const SocialPage: NextPage<SocialPageProps> = (props) => {
  return (
    <>
      <main className=' flex flex-col md:flex-center flex-1'>
        <section className='m-0'>
          <div className='content flex flex-center flex-col gap-8'>
            <Image
              className='rounded-full max-h[160px] max-w-[160px] md:max-h-[240px] md:max-w-[240px] lg:max-h-[320px] lg:max-w-[320px]'
              src='/images/nathan-healea-profile-picture.jpg'
              alt='Profile picture of Nathan Healea'
              height={3295}
              width={3295}
            />
            <h1 className='text-h4'>@nathanhealea</h1>
            <p>Let&apos;s Connect!</p>

            <div className=' max-w-xs flex flex-center flex-col gap-8'>
              <a
                href='https://github.com/NathanHealea'
                target='_blank'
                rel='noreferrer'
                className='btn btn-contained btn-strawberry w-full'
              >
                <div className='flex flex-center gap-2 w-full'>
                  <span className=' w-12 text-center'>
                    <FontAwesomeIcon icon={faGithub} size='2x' />
                  </span>
                  <span className='flex-1 text-center'>Github</span>
                </div>
              </a>
              <a
                href='https://github.com/NathanHealea'
                target='_blank'
                rel='noreferrer'
                className='btn btn-contained btn-apricot w-full'
              >
                <div className='flex flex-center gap-2 w-full'>
                  <span className=' w-12 text-center'>
                    <FontAwesomeIcon icon={faLinkedinIn} size='2x' />
                  </span>
                  <span className='flex-1 text-center'>LinkedIn</span>
                </div>
              </a>
              <a
                href='https://www.instagram.com/nathanhealea/'
                target='_blank'
                rel='noreferrer'
                className='btn btn-contained btn-lemon w-full'
              >
                <div className='flex flex-center gap-2 w-full'>
                  <span className=' w-12 text-center'>
                    <FontAwesomeIcon icon={faInstagram} size='2x' />
                  </span>
                  <span className='flex-1 text-center'>Instagram</span>
                </div>
              </a>
              <a
                href='mailto:contact@nathanhealea.com'
                target='_blank'
                rel='noreferrer'
                className='btn btn-contained btn-apple w-full'
              >
                <div className='flex flex-center gap-2 w-full'>
                  <span className=' w-12 text-center'>
                    <FontAwesomeIcon icon={faEnvelope} size='2x' />
                  </span>
                  <span className='flex-1 text-center'>Email Me</span>
                </div>
              </a>
              <a
                href='https://nathanhealea.com'
                target='_blank'
                rel='noreferrer'
                className='btn btn-contained btn-blueberry w-full'
              >
                <div className='flex flex-center gap-2 w-full'>
                  <span className=' w-12 text-center'>
                    <FontAwesomeIcon icon={faLaptop} size='2x' />
                  </span>
                  <span className='flex-1 text-center'>View My Website</span>
                </div>
              </a>
            </div>

            <p className='text-overline'>... More coming soon 😁!</p>
          </div>
        </section>
      </main>
    </>
  );
};


export default SocialPage