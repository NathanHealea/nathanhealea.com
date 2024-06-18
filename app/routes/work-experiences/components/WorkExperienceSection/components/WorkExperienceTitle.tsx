import { ReactNode } from 'react';

export interface WorkExperienceTitleProps {
  position: string;
  company: string;
  department?: string;
  summary?: string;
  dates: {
    start: string;
    end?: string;
  };
  children?: ReactNode;
}

const WorkExperienceTitle = (props: WorkExperienceTitleProps) => {
  const {
    position,
    company,
    department,
    summary,
    dates: { start, end },
    children,
  } = props;

  // TODO: Calculate the time spent in a position
  // https://stackoverflow.com/questions/17732897/difference-between-two-dates-in-years-months-days-in-javascript
  console.log(new Date(start), end && new Date(end));

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <h2>{position}</h2>
      <h4>
        {company} {department && `| ${department}`}
      </h4>
      <h6 className="text-overline">
        {start} {end == undefined && ' - Present'}{' '}
        {end !== undefined && `- ${end}`}
      </h6>
      {summary && <p>{summary}</p>}
      {children}
    </div>
  );
};

export default WorkExperienceTitle;
