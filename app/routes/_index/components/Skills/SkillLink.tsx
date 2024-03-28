import { Link } from '@remix-run/react';
import { Skill } from '~/data/Languages';

export interface SkillLinkProps extends Skill {}

const SkillLink = (props: SkillLinkProps) => {
  const { machineName, title, technical } = props;

  return (
    <div className='' key={machineName}>
      <Link to={`/skils/${machineName}`}>{title}</Link>
      {technical !== null && technical !== undefined && (
        <div className='hidden'>
          {technical.map((technical: Skill) => {
            return (
              <Link
                key={technical.machineName}
                to={`/skils/${technical.machineName}`}
              >
                {technical.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SkillLink;
