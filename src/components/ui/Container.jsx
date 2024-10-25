import React from 'react'

const Container = (props) => {
  return (
    <div className='shadow-lg border bg-white rounded-xl border-gray-200 p-2 overflow-x-auto'>
      {props.children}
    </div>
  )
}

export default Container