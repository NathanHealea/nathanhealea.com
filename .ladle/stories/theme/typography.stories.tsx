/* ------
TODO:
- Fix styling values on mobile views
------ */
import type { Story } from '@ladle/react';
import Color from 'color';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Typing = {
  title: string;
  ele?: string;
  className?: string;
};

const Typing = (props: Typing) => {
  const { title, className, ele } = props;
  const elementRef = useRef(null);
  const [styles, setStyles] = useState<CSSStyleDeclaration | null>(null);

  useEffect(() => {
    if (elementRef.current !== null && styles == null) {
      setStyles(getComputedStyle(elementRef.current));
    }
  }, [elementRef, styles]);

  return (
    <div className='flex flex-col md:flex-row justify-center gap-4'>
      <div className='w-full md:w-1/2 text-center md:text-start'>
        {React.createElement(
          ele || 'span',
          { ref: elementRef, className: className },
          title
        )}
      </div>
      <div className='flex flex-col w-full md:w-1/2 gap-2 text-xs'>
        <div className='flex flex-row gap-4 '>
          <div className='w-32 font-semibold'>Font Family</div>
          <div className='text-start'>{styles?.fontFamily.split(',')[0]}</div>
        </div>
        <div className='flex flex-row gap-4  '>
          <div className='w-32 font-semibold'>Font Size</div>
          <div className='text-start'>{styles?.fontSize}</div>
        </div>
        <div className='flex flex-row gap-4  '>
          <div className='w-32 font-semibold'>Line Height</div>
          <div className='text-start'>{styles?.lineHeight}</div>
        </div>
        {ele && (
          <div className='flex flex-row gap-4  '>
            <div className='w-32 font-semibold'>Element</div>
            <div className='text-start'>{ele}</div>
          </div>
        )}
        {className && (
          <div className='flex flex-row gap-4  '>
            <div className='w-32 font-semibold'>Class</div>
            <div className='text-start'>{className}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Typography: Story = () => {
  const Typographies: Array<Typing> = [
    {
      title: 'Heading 1',
      ele: 'h1',
      className: '',
    },
    {
      title: 'Heading 2',
      ele: 'h2',
      className: '',
    },

    {
      title: 'Heading 3',
      ele: 'h3',
      className: '',
    },
    {
      title: 'Heading 4',
      ele: 'h4',
      className: '',
    },
    {
      title: 'Heading 5',
      ele: 'h5',
      className: '',
    },
    {
      title: 'Heading 6',
      ele: 'h6',
      className: '',
    },
    {
      title: 'body',
      ele: 'p',
      className: '',
    },
    {
      title: 'Button',
      ele: 'button',
      className: '',
    },
    {
      title: 'link',
      ele: 'a',
      className: '',
    },
  ];

  const TypeStylings: Array<Typing> = [
    {
      title: 'Text H1',
      ele: '',
      className: 'text-h1',
    },
    {
      title: 'Text H2',
      ele: '',
      className: 'text-h2',
    },
    {
      title: 'Text H3',
      ele: '',
      className: 'text-h3',
    },
    {
      title: 'Text H4',
      ele: '',
      className: 'text-h4',
    },
    {
      title: 'Text H5',
      ele: '',
      className: 'text-h5',
    },
    {
      title: 'Text H6',
      ele: '',
      className: 'text-h6',
    },
  ];

  return (
    <>
      <header>
        <h1>Typography</h1>
        <p>Font theme used on nathanhealea.com</p>
      </header>
      <section className='flex flex-col gap-4 my-4'>
        {Typographies.map((typing) => (
          <Typing key={uuidv4()} {...typing} />
        ))}
      </section>
      <section className='flex flex-col gap-4 my-4'>
        {TypeStylings.map((typing) => (
          <Typing key={uuidv4()} {...typing} />
        ))}
      </section>
    </>
  );
};

export default {
  title: 'Theme',
};

