import React, { Component, useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'


const GoogleBtn = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${codeResponse.access_token}` } },
      );
    },
  });


  return (
    <div>
      <button type='button' onClick={() => login()}>
        Sign in with Google 🚀{' '}
      </button>
    </div>
  )
}

export default GoogleBtn;


