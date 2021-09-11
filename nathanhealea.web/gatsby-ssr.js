/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import PageWrapper from './wrapPageElement';
import RootWrapper from './wrapRootElement';

export const wrapPageElement = PageWrapper;
export const wrapRootElement = RootWrapper;
