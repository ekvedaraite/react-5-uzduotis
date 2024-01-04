// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Loading from './Loading';

function App() {
  const [userData, setUserData] = useState({
    avatar_url: '',
    fullName: '',
    bio: ''
  })

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('https://api.github.com/users/ekvedaraite')
        const data = await resp.json()

        setUserData({
          avatar_url: data.avatar_url,
          fullName: data.name || '',
          bio: data.bio || ''
        })

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div id="backgroundDiv">
          <div id="mainDiv">
            <div id="imageDiv">
              {userData.avatar_url && (
                <img src={userData.avatar_url} alt="API Image" />
              )}
            </div>
            <div id="nameDiv">
              <p>{userData.fullName}</p>
            </div>
            <div id="webDiv">
              <p>Web Developer - Web Designer</p>
            </div>
            <div id="bioDiv">
              <p>{userData.bio}</p>
            </div>
            <div id="socialsDiv">
              <i className="fa-brands fa-square-facebook"></i>
              <i className="fa-brands fa-square-twitter"></i>
              <i className="fa-brands fa-google-plus-g"></i>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
