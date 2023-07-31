// import React from 'react'
import Demo from './components/Demo';
import Hero from './components/Hero';
import { useState } from 'react';
// import Footer from './components/Footer'
import LanguageDropdown from './components/LanguageDropdown';
import './App.css';

const App=()=>{
    const [langcode,setlangcode]=useState("en");
    const handleSelectLanguage=(language)=>{
        setlangcode(language)
    }
    return(
        <main>
            <div className="main">
                <div className="gradient"/>
            </div>
            <div className="app">
                <Hero/>
                <LanguageDropdown  onSelectLanguage={handleSelectLanguage} />
                <Demo selectedLanguageCode={langcode}/>
                {/* <Footer/> */}
            </div>
        </main>
    )
}

export default App;