import { NextPage } from 'next';

interface ThemePageProps {}

const ThemePage: NextPage<ThemePageProps> = (props) => {
  return (
    <>
      <main className='flex flex-col items-center justify-center min-h-screen'>
        <header className='w-full py-8 my-8 max-w-5xl'>
          <h1 className='uppercase'>nathanhealea.com</h1>
          <h3>Theme</h3>
        </header>
        <section className='w-full flex flex-col py-8 my-8 max-w-5xl gap-y-8'>
          <h1>Typography</h1>
          <div className='flex flex-1'>
            <div className='flex flex-col flex-1 gap-y-8'>
              <h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <h4>Heading 4</h4>
              <h5>Heading 5</h5>
              <h6>Heading 6</h6>
              <p>Here is some text</p>
              <span className='block text-sub'>subtext</span>
              <span className='block text-overline'>overline</span>
              <span className='block text-button'>button</span>
              <span className='block text-link'>link</span>
            </div>

            <div className='flex flex-col flex-1 gap-y-8'>
              <span className='block text-h1'>.text-h1</span>
              <span className='block text-h2'>.text-h2</span>
              <span className='block text-h3'>.text-h3</span>
              <span className='block text-h4'>.text-h4</span>
              <span className='block text-h5'>.text-h5</span>
              <span className='block text-h6'>.text-h6</span>
              <span className='block text-body'>.text-body</span>
            </div>
          </div>
        </section>
        <section className='w-full flex flex-col py-8 my-8 max-w-5xl gap-y-8'>
          <h2>Colors</h2>
          <div className='flex gap-8'>
            <div className='flex overflow-hidden items-end w-16 h-64 max-h-16 max-w-[64px] bg-strawberry rounded'>
              <div className=' bg-strawberry-light flex-1 h-4' />
              <div className=' bg-strawberry-dark flex-1 h-4' />
              <div className=' bg-strawberry-content flex-1 h-4' />
            </div>

            <div className='flex overflow-hidden items-end w-16 h-64 max-h-16 max-w-[64px] bg-apricot rounded'>
              <div className=' bg-apricot-light flex-1 h-4' />
              <div className=' bg-apricot-dark flex-1 h-4' />
              <div className=' bg-apricot-content flex-1 h-4' />
            </div>

            <div className='flex overflow-hidden items-end w-16 h-64 max-h-16 max-w-[64px] bg-lemon rounded'>
              <div className=' bg-lemon-light flex-1 h-4' />
              <div className=' bg-lemon-dark flex-1 h-4' />
              <div className=' bg-lemon-content flex-1 h-4' />
            </div>

            <div className='flex overflow-hidden items-end w-16 h-64 max-h-16 max-w-[64px] bg-apple rounded'>
              <div className=' bg-apple-light flex-1 h-4' />
              <div className=' bg-apple-dark flex-1 h-4' />
              <div className=' bg-apple-content flex-1 h-4' />
            </div>

            <div className='flex overflow-hidden items-end w-16 h-64 max-h-16 max-w-[64px] bg-blueberry rounded'>
              <div className=' bg-blueberry-light flex-1 h-4' />
              <div className=' bg-blueberry-dark flex-1 h-4' />
              <div className=' bg-blueberry-content flex-1 h-4' />
            </div>

            <div className='flex overflow-hidden items-end w-16 h-64 max-h-16 max-w-[64px] bg-plum rounded'>
              <div className=' bg-plum-light flex-1 h-4' />
              <div className=' bg-plum-dark flex-1 h-4' />
              <div className=' bg-plum-content flex-1 h-4' />
            </div>

            <div className='flex overflow-hidden items-end w-16 h-64 max-h-16 max-w-[64px] bg-grape rounded'>
              <div className=' bg-grape-light flex-1 h-4' />
              <div className=' bg-grape-dark flex-1 h-4' />
              <div className=' bg-grape-content flex-1 h-4' />
            </div>

            <div className='flex overflow-hidden items-end w-16 h-64 max-h-16 max-w-[64px] bg-peach rounded'>
              <div className=' bg-peach-light flex-1 h-4' />
              <div className=' bg-peach-dark flex-1 h-4' />
              <div className=' bg-peach-content flex-1 h-4' />
            </div>

            <div className='flex overflow-hidden items-end w-16 h-64 max-h-16 max-w-[64px] bg-black rounded'></div>
          </div>
        </section>
        <section className='w-full flex flex-col py-8 my-8 max-w-5xl gap-y-8'>
          <h2>Buttons</h2>
          <div className='flex gap-8'>
            <div className='btn'>Button</div>
            <div className='btn btn-contained'>Button</div>
            <div className='btn btn-outlined'>Button</div>
          </div>

          <div className='flex gap-8'>
            <div className='btn btn-strawberry'>Button</div>
            <div className='btn btn-contained btn-strawberry'>Button</div>
            <div className='btn btn-outlined btn-strawberry'>Button</div>
          </div>

          <div className='flex gap-8'>
            <div className='btn btn-apricot'>Button</div>
            <div className='btn btn-contained btn-apricot'>Button</div>
            <div className='btn btn-outlined btn-apricot'>Button</div>
          </div>

          <div className='flex gap-8'>
            <div className='btn btn-lemon'>Button</div>
            <div className='btn btn-contained btn-lemon'>Button</div>
            <div className='btn btn-outlined btn-lemon'>Button</div>
          </div>

          <div className='flex gap-8'>
            <div className='btn btn-apple'>Button</div>
            <div className='btn btn-contained btn-apple'>Button</div>
            <div className='btn btn-outlined btn-apple'>Button</div>
          </div>

          <div className='flex gap-8'>
            <div className='btn btn-blueberry'>Button</div>
            <div className='btn btn-contained btn-blueberry'>Button</div>
            <div className='btn btn-outlined btn-blueberry'>Button</div>
          </div>

          <div className='flex gap-8'>
            <div className='btn btn-plum'>Button</div>
            <div className='btn btn-contained btn-plum'>Button</div>
            <div className='btn btn-outlined btn-plum'>Button</div>
          </div>

          <div className='flex gap-8'>
            <div className='btn btn-grape'>Button</div>
            <div className='btn btn-contained btn-grape'>Button</div>
            <div className='btn btn-outlined btn-grape'>Button</div>
          </div>

          <div className='flex gap-8'>
            <div className='btn btn-peach'>Button</div>
            <div className='btn btn-contained btn-peach'>Button</div>
            <div className='btn btn-outlined btn-peach'>Button</div>
          </div>
        </section>
        <section className='w-full flex flex-col py-8 my-8 max-w-5xl gap-y-8'>
          <h2>Links</h2>
          <div>
            <a href='#'>Link</a>
          </div>
          <div>
            <a href='#' className='link-strawberry'>
              Link
            </a>
          </div>
          <div>
            <a href='#' className='link-apricot'>
              Link
            </a>
          </div>
          <div>
            <a href='#' className='link-lemon'>
              Link
            </a>
          </div>
          <div>
            <a href='#' className='link-apple'>
              Link
            </a>
          </div>
          <div>
            <a href='#' className='link-blueberry'>
              Link
            </a>
          </div>
          <div>
            <a href='#' className='link-plum'>
              Link
            </a>
          </div>
          <div>
            <a href='#' className='link-grape'>
              Link
            </a>
          </div>
          <div>
            <a href='#' className='link-peach'>
              Link
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default ThemePage;
