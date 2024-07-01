import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons';
import Section, { SectionSection } from '~/components/Section';

import ProfilePicture from '~/images/nathan-healea-profile-picture.jpg';

interface AboutMeSectionProps {}

const AboutMeSection = (pros: AboutMeSectionProps) => {
  return (
    <Section>
      <SectionSection className="flex  flex-col items-center justify-center gap-16 md:flex-row ">
        <div className="order-2 flex flex-1 flex-col gap-4 text-center md:order-1">
          <div>
            <h2>Get to Know Me</h2>
            <h5>The person I am.</h5>
          </div>
          <p>
            As a passionate software engineer with 9 years of experience, I
            specialize in full-stack web development across Healthcare, Higher
            Education, and Finance. My skills include building scalable
            solutions using ReactJS, .Net, C#, and JavaScript.
          </p>
          <p>
            I thrive on turning ideas into feature-rich applications, creating
            user-friendly interfaces, and following industry standards. My focus
            is always on seamless user experiences that address needs and
            provide value.
          </p>
          <p>
            With a commitment to continuous learning, I collaborate effectively
            with cross-functional teams, contributing to the dynamic field of
            software development.
          </p>
          <div className="flex flex-row items-center justify-center gap-4">
            <h6 className="w-fit">Let Connect</h6>
            <a href="" className="btn btn-square btn-ghost">
              <SiGithub className="fill-base-content" />
            </a>
            <a href="" className="btn btn-square btn-ghost">
              <SiLinkedin className="fill-base-content" />
            </a>
          </div>
        </div>

        <div className=" order-1 flex items-center justify-center md:order-2">
          <div className="z-0 inline-grid">
            <div
              className="pointer-events-none col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-content blur-xl [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)] before:content-[attr(data-text)] [@supports(color:oklch(0%_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]"
              aria-hidden="true"
              data-text="component library"
            ></div>

            <div className=" relative col-start-1 row-start-1 m-4  overflow-clip  rounded-2xl ">
              <img
                src={ProfilePicture}
                alt="Nathan Healea"
                className="h-60 w-60  md:h-80 md:w-80 "
              />
            </div>
          </div>
        </div>
      </SectionSection>
    </Section>
  );
};

export default AboutMeSection;
