import React from 'react'
import NavBar from '../../components/NavBar'


import Footer from './Footer';


import Hero from './Hero';

import Features from './Features';

const Home = () => {

  return (
    <div className=' bg-white'>
        <NavBar></NavBar>
        <Hero></Hero>

        <Features></Features>        
        <Footer></Footer>
    </div>

  )
}

export default Home