import React from 'react'
import github from '../../assets/github.svg'
import linkedin from '../../assets/linkedin.svg'
import behance from '../../assets/behance.svg'
import youtube from '../../assets/youtube.svg'
import codesandbox from '../../assets/codesandbox.svg'


const Icons = () => {
    return (
        <div className='flex items-center'>
            <a href="" className="mr-1">
                <img src={github} />
            </a>
            <a href="" className="mr-1">
                <img src={linkedin} />
            </a>
            <a href="" className="mr-1">
                <img src={behance} />
            </a>
            <a href="" className="mr-1">
                <img src={youtube} />
            </a>
            <a href="" className="">
                <img src={codesandbox} />
            </a>
        </div>
    )
}

export default Icons
