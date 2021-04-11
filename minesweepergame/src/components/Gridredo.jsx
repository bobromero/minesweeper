import React from 'react';
import Box from './box';
import Bomb from './bomb';
function GridRedo({height = 8, width = 10, numBombs = 10}) {
    let game = [];
    let map = [];
    let currentNumBombs = 0;
    const style = {
        display: 'grid',
        gridTemplateColumns: `repeat(${width}, ${'20px'})`
    }
    function canPlaceBomb(placedBombs,num) {
        if(placedBombs > num){
            return false
        }
        return true;
    }
    function decideBomb(numOfBombs, i, j) {
        if (map[i][j] === true) {
            currentNumBombs=0;
            return canPlaceBomb(currentNumBombs, numOfBombs)?<Bomb/>:<Box x={j} y={i} mapP={map}/>;
        }
        return <Box x={j} y={i} mapP={map}/>;
    }
    function decideBomb1(numOfBombs) {
        //!if you don't figure something just 
        if (Math.floor(Math.random()* 10) === 1) {
            currentNumBombs++;
            return canPlaceBomb(currentNumBombs, numOfBombs);
        }
        return false;
    }
    for (let i = 0; i < height; i++) {
        let arrr = []
        for (let j = 0; j < width; j++) {
            arrr.push(decideBomb1(numBombs));
        }
        map.push(arrr);
    }
    for (let i = 0; i < height; i++) {
        let arr = []
        for (let j = 0; j < width; j++) {
            arr.push(decideBomb(numBombs, i, j,));
        }
        game.push(arr);
    }
    
    return (
        <div>
            <h1>Minesweeper</h1>
            <div style={style} className="Grid">{game}</div>
            <button onClick={()=>{console.log(game)}}>clgrid</button>
        </div>
    );
}

export default GridRedo;