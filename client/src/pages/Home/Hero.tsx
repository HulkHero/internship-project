import React from 'react'
import heroimg from '../../assets/heroimg.jpg'
import { Link } from 'react-router-dom'
import NavBar from '../../components/NavBar'
const Hero = () => {
  return (
    <div className="hero min-h-[90vh] h-screen" style={{backgroundImage: `url(${heroimg})`}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Employee Assessment App</h1>
      <p className="mb-5">Everything you need to assess and analyze team performance.The reliable and user-friendly employee performance measurement.</p>
      <Link to="/signup" className="btn btn-primary">Get Started</Link>
    </div>
  </div>
</div>
  )
}

export default Hero