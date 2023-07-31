import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import LanguageDropdown from './LanguageDropdown';

const Demo = ({selectedLanguageCode}) => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  // console.log(selectedLanguageCode)
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  // const [articleLang,setarticleLang]=useState("en");
  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);
    const { data } = await getSummary({ articleUrl: article.url 
      ,articleLang:selectedLanguageCode
    });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      // update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };
  // const [selectedLanguageCode, setSelectedLanguageCode] = useState('en');

  // const handleSelectLanguage = (language) => {
  //   setSelectedLanguageCode(language);
  // };
  return (
    <section className='mt-5 w-full max-w-xl'>
      
      {/* <p>Selected language code in parent: {selectedLanguageCode}</p> */}
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />
          
          <input
            type='url'
            placeholder='Paste the article link'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className='url_input peer' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />
          <button
          type='submit'
          className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
          >
            <div class="svg-wrapper-1">
              <div class="svg-wrapper">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
          
          {/* <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
          >
            <p>⫸</p>
          </button> */}
        </form>

        {/* Browse History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          // Loader
          <div>
          <svg height="108px" width="108px" viewBox="0 0 128 128" class="loader">
            <defs>
              <clipPath id="loader-eyes">
                <circle transform="rotate(-40,64,64) translate(0,-56)" r="8" cy="64" cx="64" class="loader__eye1"></circle>
                <circle transform="rotate(40,64,64) translate(0,-56)" r="8" cy="64" cx="64" class="loader__eye2"></circle>
              </clipPath>
              <linearGradient y2="1" x2="0" y1="0" x1="0" id="loader-grad">
                <stop stop-color="#000" offset="0%"></stop>
                <stop stop-color="#fff" offset="100%"></stop>
              </linearGradient>
              <mask id="loader-mask">
                <rect fill="url(#loader-grad)" height="128" width="128" y="0" x="0"></rect>
              </mask>
            </defs>
            <g stroke-dasharray="175.93 351.86" stroke-width="12" stroke-linecap="round">
              <g>
                <rect clip-path="url(#loader-eyes)" height="64" width="128" fill="hsl(193,90%,50%)"></rect>
                <g stroke="hsl(193,90%,50%)" fill="none">
                  <circle transform="rotate(180,64,64)" r="56" cy="64" cx="64" class="loader__mouth1"></circle>
                  <circle transform="rotate(0,64,64)" r="56" cy="64" cx="64" class="loader__mouth2"></circle>
                </g>
              </g>
              <g mask="url(#loader-mask)">
                <rect clip-path="url(#loader-eyes)" height="64" width="128" fill="hsl(223,90%,50%)"></rect>
                <g stroke="hsl(223,90%,50%)" fill="none">
                  <circle transform="rotate(180,64,64)" r="56" cy="64" cx="64" class="loader__mouth1"></circle>
                  <circle transform="rotate(0,64,64)" r="56" cy="64" cx="64" class="loader__mouth2"></circle>
                </g>
              </g>
            </g>
          </svg>
        </div>
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;