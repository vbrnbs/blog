import React from 'react';
import Icons from './ui/Icons';
import Loading from './ui/Loading';

const Footer = () => {
  return (
    <div className="md:flex md:justify-between my-4">
      <div className="md:flex md:items-end">
        <div className="flex-col">
          <div>
            <input type="e-mail" placeholder="e-mail" />
          </div>
          <div>
            <input type="text" placeholder="subject" />
          </div>
          <div className="lg:flex items-end">
            <textarea placeholder="message..." className="h-48 mr-4" style={{ transform: 'translateY(8px)' }} />
            <button>Send</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:justify-between md:items-end justify-center items-center">
        <div className="md:text-right text-center my-4 md:my-0">
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
