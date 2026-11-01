import { getCollection } from 'astro:content';
import { selectFeatured, selectSingleAbout, sortExperience, sortProjects } from './content';

export async function getExperience() {
  return sortExperience(await getCollection('experience'));
}

export async function getProjects() {
  return sortProjects(await getCollection('projects'));
}

export async function getFeaturedProjects() {
  return selectFeatured(await getCollection('projects'));
}

export async function getAbout() {
  return selectSingleAbout(await getCollection('about'));
}
