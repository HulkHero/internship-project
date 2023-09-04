import React from 'react'
import NavBar from '../components/NavBar'
import { useAppDispatch ,useAppSelector } from "../redux/hooks";
import { addUser, authSelector } from '../redux/slices/authSlice';

const Home = () => {
  const auth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  return (
    <div className='h-screen bg-white'>
        <NavBar></NavBar>
    </div>

  )
}

export default Home