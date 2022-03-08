import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from "react"



// markup
const IndexPage = () => {
  return (
    <main>

      <button className=' p-4 bg-slate-600 text-white'><FontAwesomeIcon icon={faCoffee}/ > Button test</button>

    </main>
  )
}

export default IndexPage
