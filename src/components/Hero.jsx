import React from 'react'
// import {logo} from '../assets/logo.svg'

export const Hero = () => {
  return (
    <header className='w-full container flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src='https://play-lh.googleusercontent.com/0Dp07r6svxvIwWwu-d6-YxCEBUPN4JTUj28CNnjbC_o7Q3TtT1obhf7fucJc9zZvEw=w526-h296-rw' alt='site-logo' className='w-28 object-contain'></img>
            <button type='button'
                onClick={()=>window.open('https://github.com/mayankvishnani')}
                className='black_btn'>Visit Github</button>
        </nav>
        <h1 className='head_text'>
            Summarize Articles with<br
                className='max-md:hidden'
            />
            <span className='orange_gradient'>OpenAI GPT</span>
        </h1>
        <h2 className='desc'>
            Simplify your reading with Summarizer, an
            open-source article summarizer that
            transforms lengthy articles into 
            simplified summary.<br/>
            Happy Reading!
        </h2>
    </header>
  )
}
