import React from 'react'
import '../resources/sass/error.sass'


const Error = ({errorMessage}) => (
    <p className='errorMessage'>
    {errorMessage}
  </p>
)

export default Error