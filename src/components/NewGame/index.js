import React from 'react'
import './NewGame.css';


const NewGame = ({
  createNewGame,
}) => {
  return (
    <div className="NewGame">
      <button onClick={createNewGame}>
        new game
      </button>
    </div>
  )
}

export default NewGame;