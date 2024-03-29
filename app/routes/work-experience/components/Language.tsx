import { Link } from '@remix-run/react';
import { Skill } from '~/data/skills/skills.types';

export interface LanguageProps extends Skill {}

const Language = (props: LanguageProps) => {
  const { machineName, title, technical } = props;

  return (
    <Link className='btn btn-ghost w-fit text-sm' to={`/skills/${machineName}`}>
      {title}
    </Link>
  );
};
export default Language;
