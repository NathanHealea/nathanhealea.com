interface HeroSectionProps {}

const HeroSection = (pros: HeroSectionProps) => {
  return (
    <section className=' flex flex-grow items-center justify-center '>
      <div className='flex flex-col items-center justify-center gap-4 text-center'>
        <h1 className='text-[clamp(3rem,6vw,6rem)]'>HI 👋🏻! I&apos;m,</h1>
        <h2 className='text-center text-[clamp(4rem,8vw,8rem)] font-bold '>
          <span className='z-0 inline-grid'>
            <span
              className='pointer-events-none col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text blur-xl [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)] before:content-[attr(data-text)] [@supports(color:oklch(0%_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]'
              aria-hidden='true'
              data-text='component library'
            ></span>
            <span className='relative col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&::selection]:bg-blue-700/20 [&::selection]:text-base-content [@supports(color:oklch(0%_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]'>
              Nathan Healea
            </span>
          </span>
        </h2>
        <h3 className="text-[clamp(2rem,4vw,4rem)]">Full Stack Developer & Software Engineer</h3>
        <h4 className=''>
          Currently a Programmer Analyst II @ University of Oregon
        </h4>
        <p className="uppercase tracking-widest">Site Currently under construction</p>
      </div>
    </section>
  );
};

export default HeroSection;
