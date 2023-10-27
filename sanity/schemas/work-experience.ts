import { Rule, SchemaTypeDefinition } from 'sanity';

const WorkExperience: SchemaTypeDefinition = {
  name: 'workExperience',
  type: 'document',
  title: 'Work Experience',
  fields: [
    {
      name: 'position',
      type: 'string',
      title: 'Position',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'company',
      type: 'string',
      title: 'Company',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'department',
      type: 'string',
      title: 'Department',
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'endDate',
      type: 'date',
      title: 'End Date',
    },
    {
      name: 'isCurrent',
      type: 'boolean',
      title: 'Is Current',
    },
    {
      name: 'employmentType',
      type: 'array',
      title: 'Employment Type',
      validation: (Rule: Rule) => Rule.required(),
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Full Time', value: 'full-time' },
          { title: 'Part Time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
        ],
      },
    },
    {
      name: 'isDraft',
      type: 'boolean',
      title: 'Is Draft',
    },
    {
      name: 'technologies',
      type: 'array',
      title: 'Technologies',
      validation: (Rule: Rule) => Rule.required(),
      of: [{ type: 'string' }],
    },
    {
      name: 'languagesAndFrameworks',
      type: 'array',
      title: 'Languages and Frameworks',
      validation: (Rule: Rule) => Rule.required(),
      of: [{ type: 'string' }],
    },
    {
      name: 'workExperience',
      type: 'array',
      title: 'Work Experience',
      of: [{ type: 'block' }],
    },
  ],
};

export default WorkExperience;
