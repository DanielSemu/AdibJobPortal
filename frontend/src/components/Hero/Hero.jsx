import React from 'react'

const Hero = () => {
  return (
    <div id='hero' className='main-container flex flex-col items-center justify-center'>
        <div className="text-center">
            <h1 className='text-7xl'>Join us $ <span className='text-[#007dda]'>Explore </span> <span className='text-[#007dda] block'> Our <span className='text-black'> Jobs.</span></span> </h1>
        </div>
        <div className="text-center py-10 max-w-[700px] mb-24">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam ullam delectus culpa, placeat temporibus ex facere doloremque pariatur. Culpa, voluptatum. Odio odit nesciunt ipsa laudantium totam magnam! Dignissimos, fugiat itaque?.</p>
        </div>
    </div>
  )
}

export default Hero