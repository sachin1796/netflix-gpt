import React, { useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/Validate';
import { useRef } from 'react';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { netflixBackground , userAvatar} from '../utils/constants';



const Login = () => {

  const[isSignInForm, setSignInForm] = useState(true);
  const[errorMessage,setErrorMessage] = useState(null);
  const dispatch = useDispatch();


  const email = useRef(null);
  const password = useRef(null);
  const firstName = useRef(null);



  const handleButtonClick = () => {
   
    const message = checkValidData(email.current.value , password.current.value);
    setErrorMessage(message);
    if(message) return;

    if(!isSignInForm){
      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value 
      )
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: firstName.current.value,
          photoURL: userAvatar,
        })
        .then(() => {
          // fetching update values > thats the reason we are using auth.currentUser
          const { uid , email , displayName ,photoURL} = auth.currentUser;
          dispatch(
            addUser(
              {uid:uid,
              email:email ,
              displayName:displayName ,
              photoURL:photoURL}
            )
          );
        }).catch((error) => {
          setErrorMessage(error.message);
        });
   })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "~" + errorMessage);
        

        // ..
      });
    }
    else{
      // sign in
      signInWithEmailAndPassword(auth, email.current.value , password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode +"~"+ errorMessage)
       
      }); 

    }


  }

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  }



  return (
  <div>
    <Header />
    <div className='absolute'>
    <img 
      className='h-screen object-cover md:h-auto'
      src={netflixBackground}
      alt="logo"
      ></img>
    </div>

    <form
      onSubmit={(e) => e.preventDefault()}
      id="form"
      className="w-full md:w-4/12 absolute bg-black bg-opacity-85 my-40 mx-auto right-0 left-0 rounded-md">
      <h1 
      className="font-bold text-3xl py-4 mx-12 text-white"
      >{isSignInForm ? "Sign In" : "Sign Up"}</h1>

      { !isSignInForm &&(
      <input 
      ref={firstName}
       type="text"
       placeholder="First Name" 
       className="py-2 mx-12 my-2 w-80 rounded-md bg-slate-300 text-black focus:outline-none" />)
       }

      { !isSignInForm &&(
      <input 
       type="text"
       placeholder="Last Name" 
       className="py-2 mx-12 my-2 w-80 rounded-md bg-slate-300  text-black focus:outline-none" />)}


      <input
       ref = {email}
       type="text"
       placeholder="Email or Phone No."
       id="email"
       autoComplete="off"
       className="py-2 px-2 mx-12 my-2 w-80 rounded-md bg-slate-300  text-black focus:outline-none" />

      <input 
       ref = {password}
       id="password"
       type="password"
       placeholder="Password"
       autoComplete="off"
       className="py-2 px-2 mx-12 my-2 w-80 rounded-md  bg-slate-300  text-black focus:outline-none" />

      <p className="font-bold text-red-600 text-lg mx-12">{errorMessage}</p>

      <button 
      className="py-2 mx-12 mt-8 mb-12 bg-red-600 w-80 rounded-md text-white"
      onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

      <p 
       className="py-2 mx-12 cursor-pointer underline text-white" onClick={toggleSignInForm}>
        {isSignInForm ? "New to Netflix?Sign Up Now" : " "}</p>

    </form>
  </div>
  )
}

export default Login