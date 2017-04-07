import React, { Component } from 'react';
import _ from 'lodash';

import Grid from './components/Grid';
import Box from './components/Box';
import NewGame from './components/NewGame';
import Timer from './components/Timer';

import { newBoard, expandSelection } from './utils';

import './App.css';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cols: 8,
      rows: 8,
      bombs: 10,
      remaining: 8 * 8 - 10,
      size: 3,
      board: [],
      running: false,
      cheat: false,
    };

    this.createNewGame = this.createNewGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.reset = this.reset.bind(this);
    this.reveal = this.reveal.bind(this);
    this.pause = this.pause.bind(this);
  }

  createNewGame() {
    const { state: { bombs, rows, cols } } = this;
    this.setState({
      board: newBoard(bombs, rows, cols),
      running: true,
    });
  }

  endGame() {
    const { state: { board } } = this;
    const updatedBoard = board.map(box => Object.assign({}, box, { revealed: true }));
    this.setState({
      board: updatedBoard,
      running: false,
      remaining: 0,
    });
  }

  leftClick(e) {
    const { state: { board, remaining, cols } } = this;
    const { id, value } = e.target;

    if (String(value) === "-1") {
      return this.endGame(this);
    }

    let updatedBoard = board;

    if (String(value) === "0") {
      updatedBoard = expandSelection(cols, id, updatedBoard);
    } else {
      let updatedBox = Object.assign({}, board[id], { revealed: true });
      updatedBoard = board.map((box, idx) => String(idx) === id ? updatedBox : box);
    }
    this.setState({
      board: updatedBoard,
      remaining: remaining - 1,
    });
    return;
  }

  rightClick(e) {
    e.preventDefault();
    const { id } = e.target;
    const { board } = this.state;

    const updatedBox = Object.assign({}, board[id], { flag: !board[id].flag });


    this.setState({
      board: board.map((box, idx) => String(idx) === id ? updatedBox : box),
    })
  }

  renderBoard() {
    const {
      state: { board, running, cheat, remaining, pause },
      createNewGame,
      leftClick,
      rightClick,
    } = this;

    return board.length > 0 ?
      board.map((box, idx) => (
        <Box
          {...box}
          key={idx}
          id={idx}
          leftClick={leftClick}
          rightClick={rightClick}
          cheat={cheat}
          end={remaining === 0 && !running}
          pause={pause}
        />
      )) :
      (<NewGame createNewGame={createNewGame} />);
  }

  reset() {
    const { state: { cols, rows, bombs, size }, props: { initialState } } = this;
    this.setState({
      ...initialState,
      cols,
      rows,
      bombs,
      size,
      remaining: cols * rows - bombs,
    });
  }

  reveal() {
    this.setState({
      cheat: !this.state.cheat,
    });
  }

  pause() {
    if (this.state.remaining > 0) {
      this.setState({
        running: !this.state.running,
      });
    }
  }

  render() {
    const {
      state: {
        rows, cols, size, board, running, cheat, remaining,
      },
      renderBoard,
      reset,
      reveal,
      pause,
      endGame,
    } = this;

    const len = board.length === 0;

    return (
      <div className="App">
        <div className="App-header">
          <div>
            <Timer running={running} reset={len} />
          </div>
          <div>
            <button className="ui small button" onClick={reset}>reset</button>
            <div className="ui buttons">
              <button
                className="ui button"
                onClick={() => { pause(); reveal(); }}
                disabled={len}
              >
                {cheat ? 'hide' : 'reveal'}
              </button>
              <button
                className="ui button"
                onClick={pause}
                disabled={len || cheat}
              >
                {running ? 'pause' : 'continue'}
              </button>
              <button
                className="ui button"
                onClick={endGame}
                disabled={!running}
              >
                end
              </button>
            </div>
          </div>
        </div>
        <Grid style={{ width: `${cols * size}px`, height: `${rows*size}px` }}>
          {renderBoard()}
        </Grid>
      </div>
    );
  }
}

export default App;
