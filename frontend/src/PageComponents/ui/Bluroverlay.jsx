import React from 'react'

function Bluroverlay(props) {
  return (
    <div className='h-screen w-screen backdrop-blur-md fixed top-0 left-0 z-20'>
        {props.children}
    </div>
  )
}

export default Bluroverlay