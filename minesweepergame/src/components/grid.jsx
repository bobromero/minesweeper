import React from 'react';
import Box from './box';
import Bomb from './bomb';
function Grid({height = 8, width = 10, numBombs = 10}) {
    const [game] = React.useState([]);
    const [map] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    let bombMap = [];
    let played = [];
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
        if (map[i][j] == true) {
            currentNumBombs=0;
            return <Bomb/>;
            return canPlaceBomb(currentNumBombs, numOfBombs)?<Bomb/>:<Box x={j} y={i} mapP={map}/>;
        }
        return <Box x={j} y={i} mapP={map}/>;
    }
    //!figure this out
    
    function checkAvailable(rh,rw){
        //!get this working
        //*checks every spot on the bomb map to see if it is a duplicate
        //*if it is found, return new spot
        for(let i = 0; i < bombMap.length; i++){
            if(bombMap[i][0] === rh && bombMap[i][1] === rw){
                console.log(bombMap[i][0])
                let rh1 = Math.floor(Math.random()* height);
                let rw1 = Math.floor(Math.random()* width);
                return checkAvailable(rh1,rw1);
            }
        }
        //*if not found, return original number
        return [rh,rw];
    }
    function setBombs() {
        for (let x = 0; x < numBombs; x++) {
            let randHeight = Math.floor(Math.random()* height);
            let randWidth = Math.floor(Math.random()* width);
            let arr = checkAvailable(randHeight, randWidth);
            bombMap.push(arr);
            map[arr[0]][arr[1]] = true;
        }
    }
    // console.log(game)
    React.useEffect(() =>{
        for (let i = 0; i < height; i++) {
            let arr = []
            for (let j = 0; j < width; j++) {
                arr.push(false);
            }
            played.push(arr);
            map.push(arr);
        }
        setBombs();
        for (let i = 0; i < height; i++) {
            let arr = []
            for (let j = 0; j < width; j++) {
                arr.push(decideBomb(numBombs, i, j));
            }
            game.push(arr);
        }
        setCounter(counter + 1)
    }, [])
    
    return (
        <div>
            <h1>Minesweeper</h1>
            <div style={style} className="Grid">{game}</div>
            <button onClick={()=>{console.log(map)}}>clgrid</button>
        </div>
    );
}

export default Grid;