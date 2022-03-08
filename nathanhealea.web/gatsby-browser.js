/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import PageWrapper from "./src/wrappers/PageElement"
import RootWrapper from "./src/wrappers/RootElement"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


// Tailwind
import './src/styles/tailwind.css'


library.add(fas, far, fab);


export const wrapPageElement = PageWrapper
export const wrapRootElement = RootWrapper