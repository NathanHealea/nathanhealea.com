import { client } from '../../../sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { NextPage } from 'next';
import { SanityDocument } from 'next-sanity';
import { TypedObject } from 'sanity';

interface WorkExperiencePageProps {}

type WorkExperience = {
  _id: string;
  position: string;
  company: string;
  department?: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  employmentType: Array<string>;
  isDraft: boolean;
  technologies: Array<string>;
  languagesAndFrameworks: Array<string>;
  workExperience: TypedObject[];
};

const WorkExperiencePage = async (props: WorkExperiencePageProps) => {
  const workExperiences = await client.fetch<
    Array<SanityDocument<WorkExperience>>
  >(`*[_type == "workExperience"]`);

  console.log(workExperiences);

  return (
    <>
      <main className=' flex flex-col md:flex-center flex-1'>
        {workExperiences.map((we) => {
          return (
            <section key={we._id}>
              <h1>{we.position}</h1>
              <h2>{we.company}</h2>
              <PortableText value={we.workExperience} />
            </section>
          );
        })}
      </main>
    </>
  );
};

export default WorkExperiencePage;
