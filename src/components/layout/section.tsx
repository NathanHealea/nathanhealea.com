
import { cn } from '@/lib/utils';
import * as React from "react"



function Section({...props}: React.ComponentProps<"section">){
  return (
    <section {...props} />
  )
}


function SectionContent({className, ...props}: React.ComponentProps<"div">){
  return (
    <div
      className={(cn("container mx-auto px-6 py-20", className))}
      {...props}
    {...props} />
  )
}



export {Section, SectionContent}