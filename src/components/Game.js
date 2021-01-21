import React, { useState } from 'react';
import { calculateWinner } from '../helpers';
import Board from './Board';

const styles={
    width: '200px',
    margin: '20px auto',
};

const buttonStyle = {
    width: '70px',
    margin: '1px auto',
    padding: '2px',
    border: '2px solid blue',
    borderRadius: '3px',
};

const spanStyle = {
    marginTop: '0',
    paddingTop: '0',
    position: 'absolute',
}

const Game = () => {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);

    const handleClick = (i) => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = timeInHistory[stepNumber];
        const squares = [... current];

        //if user clicks an occupied square or someone won
        if(winner || squares[i]) return;

        //Put an X or O in the clicked square

        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...timeInHistory, squares]);
        setStepNumber(timeInHistory.length)
        setXisNext(!xIsNext);
    }
    
    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
    }

    const renderMoves = () => (
        history.map((_step, move) => {
            const destination = move ? `Go to move ${move}` : 'Go to start';

            return (
                <ul key={move}>
                    <button style={buttonStyle} onClick={() => jumpTo(move)}>{destination}</button>
                </ul>
            )
        })
    );
 
    return(
        <>
            <Board squeares={history[stepNumber]} onClick={handleClick} /><span style={spanStyle}>{renderMoves()}</span>
            <div style={styles}>
                <p>{winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}</p>
            </div>
        </>
    )
}

export default Game;