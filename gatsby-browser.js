/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import PageWrapper from "./src/wrappers/PageElement"
import RootWrapper from "./src/wrappers/RootElement"

// Tailwind
import './src/styles/tailwind.css'


export const wrapPageElement = PageWrapper
export const wrapRootElement = RootWrapper