import React from 'react'
import './Preloader.css'

const rootFrame = document.getElementById('root')
rootFrame.classList.add('blocked')
console.log(rootFrame)

const Preloader = () => {
// const Preloader = ({preloader}) => {
    return (
        <div className='preloader'>
        {/* <div className={!preloader ? ('preloader') : ('preloader_hide')}> */}
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
