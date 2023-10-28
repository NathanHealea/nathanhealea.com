import { WorkExperience, getWorkExperience } from '@/modules/WorkExperience';
import { PortableText } from '@portabletext/react';

interface WorkExperiencePageProps {}

const WorkExperiencePage = async (props: WorkExperiencePageProps) => {
  const workExperiences = await getWorkExperience();

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
