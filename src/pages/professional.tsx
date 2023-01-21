import {
  faGithub,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head } from 'components';
import { useBreakpoints } from 'hooks/useBreakpoints';
import { NextPage } from 'next.types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * NextJS Declaration of a SafeNumber
 */
type SafeNumber = number | `${number}`;

type ProfileImageDimensions = {
  width: SafeNumber | undefined;
  height: SafeNumber | undefined;
};

interface SocialPageProps {}

const SocialPage: NextPage<SocialPageProps> = (props) => {
  const { isDesktop, isLaptop, isTablet, isPhone } = useBreakpoints();

  const [profileImageDimensions, setProfileImageDimension] =
    useState<ProfileImageDimensions>({
      width: 320,
      height: 320,
    });

  useEffect(() => {
    if (isDesktop || isLaptop) {
      setProfileImageDimension({ width: 320, height: 320 });
    } else if (isTablet) {
      setProfileImageDimension({ width: 240, height: 240 });
    } else {
      setProfileImageDimension({ width: 160, height: 160 });
    }
  }, [isDesktop, isLaptop, isTablet, isPhone]);

  return (
    <>
      <Head
        title="Let's Connect!"
        description='Connect with my a cross multiple platforms at @nathanhealea'
      />

      <main className=' flex flex-col md:flex-center flex-1'>
        <section className='m-0'>
          <div className='content flex flex-center flex-col gap-8'>
            <Image
              className='rounded-full'
              src='/images/nathan-healea-profile-picture.jpg'
              alt='Profile picture of Nathan Healea'
              height={profileImageDimensions.height}
              width={profileImageDimensions.width}
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
                href='https://linkedin.com/in/nathanhealea'
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
          </div>
        </section>
      </main>
    </>
  );
};

export default SocialPage;
