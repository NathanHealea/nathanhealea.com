import { Link } from '@remix-run/react';
import { Skill as SkillType } from '~/data/skills/skills.types';

export interface SkillProps extends SkillType {}

const Skill = (props: SkillProps) => {
  const { machineName, title, technical } = props;

  return (
    <Link className="btn btn-ghost w-fit text-sm" to={`/skills/${machineName}`}>
      {title}
    </Link>
  );
};
export default Skill;
