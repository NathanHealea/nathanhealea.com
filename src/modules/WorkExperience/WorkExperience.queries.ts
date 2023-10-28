import { WorkExperienceDocument } from './WorkExperience.types';
import { client } from '@sanity-client/lib/client';

export const getWorkExperienceQuery = `*[_type == "workExperience"] | order(startDate desc)`;
/**
 * Gets all work experiences documents, ordered by start date descending.
 * @returns {WorkExperienceDocument} an array of work experience documents.
 */
export const getWorkExperience = async (): Promise<
  Array<WorkExperienceDocument>
> =>
  await client.fetch<Array<WorkExperienceDocument>>(getWorkExperienceQuery, {
    revalidate: 30,
  });
