import { useState } from 'react'

const TweetForm = ({ onAddTweet }) => {
  const [text, setText] = useState('') // Texto del tweet

  // Acciones
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text.trim()) {
      return
    }
    onAddTweet(text)
    setText('')
  }

  return (
    <form className='tweetForm-container' onSubmit={handleSubmit}>
      {/* Formulario para nuevo tweet */}
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='¿Qué estás pensando?'
      />
      <button type='submit'>Tweet</button>
    </form>
  )
}

export default TweetForm
