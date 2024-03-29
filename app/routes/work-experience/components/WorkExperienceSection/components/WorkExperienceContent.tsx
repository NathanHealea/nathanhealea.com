import { v4 } from 'uuid';

interface WorkExperienceContentProps {
  title: string;
  data: Array<any>;
  render: (props: any) => JSX.Element;
}

const WorkExperienceContent = (props: WorkExperienceContentProps) => {
  const { title, data, render: Component = 'div' } = props;

  if (!data) {
    return null;
  }

  return (
    <>
      <h3>{title}</h3>
      <div className='flex flex-wrap justify-center gap-2 md:justify-start'>
        {data.map((d) => (
          <Component key={v4()} {...d} />
        ))}
      </div>
    </>
  );
};

export default WorkExperienceContent;
