import React from 'react'

const FormError = ({error}) => {
  return (
    <p className='text-red-500 '>{error}</p>
  )
}

export default FormError