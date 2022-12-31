import NextHead from 'next/head';
import { FC, ReactNode } from 'react';

interface HeadProps {
  title?: string | undefined;
  description?: string | undefined;
  children?: ReactNode | undefined;
}

const Head: FC<HeadProps> = (props) => {
  const { title, description, children } = props;
  return (
    <NextHead>
      <title>{`Nathan Healea - ${title}`}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#f8f9fa' />
      <meta name='msapplication-TileColor' content='#f8f9fa' />
      <meta name='theme-color' content='#f8f9fa'></meta>
      {children}
    </NextHead>
  );
};

Head.defaultProps = {
  title: 'Full Stack Developer & Software Engineer',
  description:
    'Experienced Full Stack Developer, engineering solutions in healthcare, fiance, and education. Passion for transforming ideas into feature rich applications.',
};

export default Head;
