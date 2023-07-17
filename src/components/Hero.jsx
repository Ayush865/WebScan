// import React from 'react'
import {logo} from "../assets";
import Socials from './Socials';
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center w-full mb-10 pt-3">
            <img src={logo} alt="Logo" className="w-28 object-contain" />
            <Socials/>
            {/* <button type="button" 
            onClick={()=>{
                window.open('https://github.com/Ayush865/WebScan',"_blank")
            }}
             className="black_btn">
                Github
            </button> */}
        </nav>
        <h1 className="head_text">
            Summarize Articles with <br className="max-md:hidden"/>
            <span className="blue_gradient ">Artifical Intelligence</span>
        </h1>
        <h2 className="desc">
            Simplify your reading with WebScan, an open-source article summarizer that transforms lengthy articles into clear and concise summaries
        </h2>
    </header>
  )
}

export default Hero;