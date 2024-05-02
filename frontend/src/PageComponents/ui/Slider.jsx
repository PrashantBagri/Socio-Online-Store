import React from 'react'


function Slider(props) {
  return (
        <>
            <div  className=' h-[80vh]   w-screen px-8 bg-[#121212]'>
                {props.children}
            </div>
        </>

  )
}

export default Slider