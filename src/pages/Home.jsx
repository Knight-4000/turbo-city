import React from 'react'
import './home.scss';
import Events from './Events'
import StoresMain from './StoresMain';

export default function Home() {
  return (
    <>
      <div className="justify-content-center">
          <div className='opening'>
            <div className='outer'>
              <div className='inner'>
                <h1 className='text-center opening-header'>Turbo City Mall</h1>
                <h2 className='text-center opening-text'>The fun you remember. An experience you'll never forget.</h2>
              </div>
            </div>
          </div>    
       <StoresMain />
      </div>
      <Events />
    </>
  )
}
