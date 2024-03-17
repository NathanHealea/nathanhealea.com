import { ReactNode } from 'react';
import { Skill } from '~/data/skills';

export interface SkillCardProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  skills: Array<Skill>;
}

const SkillCard = (props: SkillCardProps) => {
  const { icon, title, description, skills = [] } = props;

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='h-16 w-16 rounded-lg bg-slate-400'>{icon}</div>
      <h4>{title}</h4>
      <p>{description}</p>
      <div className='flex flex-wrap justify-center gap-4'>
        {skills.map((skill: Skill) => {
          return (
            <div className='' key={skill.machineName}>
              <a
                href={`/skills/${skill.machineName}`}
                className='btn btn-outline'
              >
                {skill.title}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillCard;
