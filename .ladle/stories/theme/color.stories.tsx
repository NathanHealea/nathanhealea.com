import type { Story } from '@ladle/react';
import Color from 'color';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Swatch = (props: { color: string; variant?: string; shade?: string }) => {
  const { color, variant, shade } = props;
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
  const swatchRef = useRef(null);

  useEffect(() => {
    if (swatchRef.current !== null && backgroundColor == null) {
      setBackgroundColor(
        Color(getComputedStyle(swatchRef.current).backgroundColor)
          .hex()
          .toString()
      );
    }
  }, [swatchRef, backgroundColor]);

  const handleCopyBackgroundHexValue = async () => {
    try {
      if (backgroundColor !== null) {
        await navigator.clipboard.writeText(backgroundColor);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      onClick={handleCopyBackgroundHexValue}
      className=' gap-x-3 w-full cursor-pointer block space-y-1.5'
    >
      <div
        ref={swatchRef}
        className='h-10 rounded dark:ring-1 dark:ring-inset dark:ring-white/10 w-full'
        style={{
          backgroundColor: `rgb(var(--${[color, variant, shade]
            .filter(Boolean)
            .join('-')}))`,
        }}
      ></div>
      <div className='px-0.5'>
        <div className='w-6 font-medium text-xs text-slate-900 2xl:w-full dark:text-white'>
          <span className='uppercase'>{variant || shade}</span>
        </div>
        <div className='text-slate-500 text-xs font-mono lowercase dark:text-slate-400 sm:text-[0.625rem] md:text-xs lg:text-[0.625rem] 2xl:text-xs'>
          {backgroundColor}
        </div>
      </div>
    </div>
  );
};

export const Colors: Story = () => {
  const colors = [
    'strawberry',
    'apricot',
    'lemon',
    'apple',
    'blueberry',
    'plum',
    'grape',
    'peach',
  ];
  const variants = ['default', 'light', 'dark', 'content'];
  const shades = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ];

  return (
    <>
      <header>
        <h1>Colors</h1>
        <p>Color theme used on nathanhealea.com</p>
      </header>
      {colors.map((color) => (
        <section key={uuidv4()} className='flex flex-col gap-4 my-4'>
          <h2 className='capitalize'>{color}</h2>
          <div className='flex flex-row gap-4'>
            {variants.map((variant) => (
              <Swatch key={uuidv4()} color={color} variant={variant} />
            ))}
          </div>
          <div className='flex justify-center gap-4 flex-wrap lg:flex-nowrap'>
            {shades.map((shade) => (
              <Swatch key={uuidv4()} color={color} shade={shade} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
};

export default {
  title: 'Theme',
};

