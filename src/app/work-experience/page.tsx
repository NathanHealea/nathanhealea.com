import { WorkExperience } from '@/modules/WorkExperience';
import { getWorkExperienceQuery } from '@/modules/WorkExperience/WorkExperience.queries';
import { WorkExperienceDocument } from '@/modules/WorkExperience/WorkExperience.types';
import { sanityFetch } from '@sanity-client/lib/sanityFetch';

interface WorkExperiencePageProps {}

const getWorkExperiences = async (): Promise<Array<WorkExperienceDocument>> =>
  await sanityFetch({
    query: getWorkExperienceQuery,
    tags: ['page:work-experience'],
  });

const WorkExperiencePage = async (props: WorkExperiencePageProps) => {
  const workExperiences = await getWorkExperiences();

  console.log(workExperiences);

  return (
    <>
      <main className=' flex flex-col md:flex-center flex-1 gap-8'>
        {workExperiences.map((workExperience) => (
          <WorkExperience key={workExperience._id} data={workExperience} />
        ))}
      </main>
    </>
  );
};

export default WorkExperiencePage;
