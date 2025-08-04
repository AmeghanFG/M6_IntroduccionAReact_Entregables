import { useState, useEffect } from 'react'
import TweetList from '../components/TweetList'
import TweetForm from '../components/TweetForm'
import { Link } from 'react-router-dom'

const Home = ({ user, logout }) => {
  const [tweets, setTweets] = useState([]) // Array de tweets

  // Carga inicial y guardado de tweets en localStorage
  useEffect(() => {
    const storedTweets = JSON.parse(localStorage.getItem('tweets')) || []
    setTweets(storedTweets)
  }, [])

  useEffect(() => {
    localStorage.setItem('tweets', JSON.stringify(tweets))
  }, [tweets])

  const addTweet = (text) => {
    const newTweet = {
      id: Date.now(),
      text,
      likes: 0,
    }

    setTweets(prevTweets => [newTweet, ...prevTweets])
  }

  const likeTweet = (id) => {
    setTweets(prevTweets =>
      prevTweets.map(tweet =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
      )
    )
  }

  return (
    <div>
      <h1>Forma muy simplificada de Twitter</h1>
      {user && (
        <>
          <h2>Hola, {user.userName}</h2>
          <Link to='/profile'><button>Ver perfil</button></Link>
        </>
      )}
      <TweetForm onAddTweet={addTweet} />
      <TweetList tweets={tweets} onLike={likeTweet} />

      {user
        ? (
          <div>
            <p>¿Quieres cerrar sesión {user.userName} ?</p>
            <button onClick={logout}>Cerrar sesión</button>
          </div>
          )
        : (
          <div>
            <p>¿Quieres iniciar sesión?</p>
            <Link to='/login'><button>Iniciar sesión</button></Link>
          </div>
          )}
    </div>
  )
}

export default Home
