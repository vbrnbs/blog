import React from 'react';
import Icons from './ui/Icons';
import Loading from './ui/Loading';

const Footer = () => {
  return (
    <div className="lg:flex justify-between my-4">
      <div className="lg:flex items-end">
        <div className="flex-col">
          <div>
            <input type="e-mail" placeholder="e-mail" />
          </div>
          <div>
            <input type="text" placeholder="subject" />
          </div>
          <div className="lg:flex items-end">
            <textarea placeholder="message..." className="h-48 mr-4" style={{ transform: 'translateY(8px)' }} />
            <div className='flex justify-center w-100'>
             <button className=''>Send</button>
            </div>
            
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:justify-between lg:items-end justify-center items-center">
        <div className="lg:text-right text-center my-4 lg:my-0">
          <strong>Barnabás Várszegi</strong>
          <p className="font-thin">Frontend Developer</p>
          varszegibarnabas@gmail.com
        </div>
        <Icons />
      </div>
    </div>
  );
};

export default Footer;
