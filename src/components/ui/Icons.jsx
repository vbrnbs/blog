import React from 'react'
import github from '../../assets/github.svg'
import linkedin from '../../assets/linkedin.svg'
import vimeo from '../../assets/vimeo.svg'
import behance from '../../assets/behance.svg'
import youtube from '../../assets/youtube.svg'
import codesandbox from '../../assets/codesandbox.svg'


const Icons = () => {
    return (
        // <div className='flex items-center'>
        //     <a href="" className="mr-1">
        //         <img src={github} />
        //     </a>
        //     <a href="" className="mr-1">
        //         <img src={linkedin} />
        //     </a>
        //     <a href="" className="mr-1">
        //         <img src={behance} />
        //     </a>
        //     <a href="" className="mr-1">
        //         <img src={youtube} />
        //     </a>
        //     <a href="" className="">
        //         <img src={codesandbox} />
        //     </a>
        // </div>
        <div className='flex items-center'>
            <a target='_blank' href="https://github.com/vbrnbs" className="mr-1" title='GitHub'>
                <img src={github} />
            </a>
            <a target='_blank' href="https://vimeo.com/user47402173" className="mr-1 hover:scale-125 ease-linear " title='Vimeo'>
                <img src={vimeo} />
            </a>
            <a target='_blank' href="https://www.linkedin.com/in/barnabasvarszegi/" className="mr-1" title='LinkedIn'>
                <img src={linkedin} />
            </a>
        </div>

    )
}

export default Icons
