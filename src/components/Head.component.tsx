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
      <link rel='icon' href='/favicon.ico' />
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
