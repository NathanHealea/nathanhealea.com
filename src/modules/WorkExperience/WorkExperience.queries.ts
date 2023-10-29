/**
 * Gets all work experiences documents, ordered by start date descending.
 * @returns {WorkExperienceDocument} an array of work experience documents.
 */
export const getWorkExperienceQuery = `*[_type == "workExperience"] | order(startDate desc)`;
