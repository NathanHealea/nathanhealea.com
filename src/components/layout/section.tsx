
import { cn } from '@/lib/utils';
import * as React from "react"



function Section({ className, ...props}: React.ComponentProps<"section">){
  return (
    <section className={cn('flex justify-center items-center min-h-[512px]', className)} {...props} />
  )
}


function SectionContent({className, ...props}: React.ComponentProps<"div">){
  return (
    <div
      className={(cn("container mx-auto px-6 py-20 ", className))}
      {...props}
    {...props} />
  )
}



export {Section, SectionContent}