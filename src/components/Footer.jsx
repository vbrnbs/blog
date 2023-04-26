import React from 'react'
import Icons from './Icons'

const Footer = () => {
    return (
        <div className='md:flex md:justify-between my-4'>
            <div className='md:flex md:items-end'>
                <div className='flex-col'>
                    <div><input type="text" placeholder='e-mail' /></div>
                    <div><input type="text" placeholder='subject' /></div>
                    <div><textarea placeholder='message...' className='h-48' /></div>
                </div>

                <div><button>Send</button></div>
            </div>
            <div className='flex flex-col md:justify-between md:items-end justify-center items-center'>
                <div className='md:text-right text-center my-4 md:my-0 '>
                    <strong>Barnabás Várszegi</strong>
                    <p className='font-thin'>Frontend Developer</p>
                    varszegibarnabas@gmail.com
                </div>
                <Icons />
            </div>
        </div>
    )
}

export default Footer
