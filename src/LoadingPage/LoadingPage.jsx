import React from 'react'
import './LoadingPage.css'

const LoadingPage = () => {
  return (
    <main>
        <div className='loading'>
          <div className='circle color-1 scale-up-center'></div>
          <div className='circle color-2 scale-up-center'></div>
          <div className='circle color-3 scale-up-center'></div>
        </div>
    </main>
  )
}

export default LoadingPage