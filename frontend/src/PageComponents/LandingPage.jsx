import React from 'react'
import Hero from './ui/Hero'
import BrandRow from './ui/BrandRow'
import Featured from './ui/Featured'


function LandingPage() {
  return (
      <>
        {/* Adding Landing Page Rows */}
        <Hero/>
        <BrandRow/>
        <Featured/>
      </>
  )
}

export default LandingPage