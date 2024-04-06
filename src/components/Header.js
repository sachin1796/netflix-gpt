import React from 'react'
import {auth} from "../utils/firebase";
import {  signOut ,onAuthStateChanged } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { netflixLogo } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice'
import { SUPPORTED_LANGUAGES } from '../utils/constants'
import { changeLang } from '../utils/languageSlice';


const Header = () => {

  const navigate = useNavigate(); 
  const user = useSelector(store => store.user);
  const showGptSearchValue = useSelector(store => store.gpt.showGptSearch);


  const dispatch = useDispatch();

 

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
    })
    .catch((error) => {
    });
  }


  // every time we signIn / signOut > our auth state will change from here
  // and we will do the naviation from here 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid , email , displayName ,photoURL} = user;
        dispatch(
          addUser(
            {uid:uid,
            email:email ,
            displayName:displayName ,
            photoURL:photoURL}
          )
        );
        // navigation only on authentication
       navigate("/browse")
      } 
    else {
       dispatch(removeUser());
       navigate("/")
    }
    });
     return () =>  unsubscribe();
  },[]);


  const handleGptSearch = () => {
    dispatch(toggleGptSearchView())
  }



  const handleLanguageChange = (e) => {
    dispatch(changeLang(e.target.value))
 
  }

  return (

    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between flex-col md:flex-row">
    <img 
    className="w-52 mx-auto md:mx-0"
    src={netflixLogo}
    alt="netlfix-logo" />


    {user && (
      <div className='flex p-2 justify-evenly'>
    {showGptSearchValue &&
     (<select 
        className='bg-zinc-500 text-white rounded-xl mr-2 mb-4 mt-2 '
        onChange={handleLanguageChange}>
          {
            SUPPORTED_LANGUAGES.map((lang) => <option  key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
          }
        
        </select>)}
        <button
        className='bg-red-600 text-white rounded-xl px-4 mb-4 mt-2 my-1  p-1 hover:bg-opacity-85'
        onClick={handleGptSearch}
        >{showGptSearchValue ? "Home" :"GPT Search"}</button>
        <img 
        alt="userIcon"
        src={user?.photoURL}
        className="hidden md:block w-12 h-12 rounded-xl ml-2 mt-2 "></img>

        <button
        onClick={handleSignOut}
        className='font-semibold ml-2 text-white hover:text-lime-400'>
          (Sign Out)</button>
      </div>)
    }
     

    </div>
  )
}

export default Header