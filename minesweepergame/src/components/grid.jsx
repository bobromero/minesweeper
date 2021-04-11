import React from 'react';
import Box from './box';
import Bomb from './bomb';
function Grid({height = 8, width = 10, numBombs = 10}) {
    const [game, setGame] = React.useState([]);
    const [finalState, setFinalState] = React.useState([]);
    const [clickedArr, setClickedArr] = React.useState([]);
    const [map, setMap] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const [gameOver, setGameOver] = React.useState(false);
    let bombMap = [];
    let played = [];
    let currentNumBombs = 0;
    const style = {
        display: 'grid',
        gridTemplateColumns: `repeat(${width}, ${'20px'})`
    }
    function endGame(result) {
        //!make this reveal all bombs and end game
        setFinalState(game)
        setGame([])
        setGameOver(true);
        giveResult(result);
    }
    function giveResult(result) {
        console.log(result)
    }
    function wasClicked(x, y) {
        for (let i = 0; i < clickedArr.length; i++) {
            if (clickedArr[i][0] == x && clickedArr[i][1] == y) {
                return;
            }
        }
        clickedArr.push([x,y]);
        if((height * width - numBombs) == clickedArr.length){
            endGame('winner');
            return;
        }
        
    }
    function decideBomb(numOfBombs, i, j, clicked=false) {
        if (map[i][j] == true) {
            currentNumBombs=0;
            return <Bomb x={j} y={i} clickedArr={clickedArr} wasClicked={wasClicked} endGame={endGame} gameOver={gameOver}/>;
        }
        return <Box x={j} y={i} mapP={map} clickedArr={clickedArr} wasClicked={wasClicked} gameOver={gameOver} clicked={clicked}/>;
    }
    ////figure this out
    
    function checkAvailable(rh,rw){
        ////get this working
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
    function setBombs(map1) {
        if(!map1){
            for (let x = 0; x < numBombs; x++) {
                let randHeight = Math.floor(Math.random()* height);
                let randWidth = Math.floor(Math.random()* width);
                let arr = checkAvailable(randHeight, randWidth);
                bombMap.push(arr);
                map[arr[0]][arr[1]] = true;
            }
            return;
        }
        for (let x = 0; x < numBombs; x++) {
            for(let i = 0; i < map1.length; i++){
                // map[map1[i][0]][map1[i][1]] = true;
            }
        }

    }
    React.useEffect(() =>{
        if(gameOver){
            for (let i = 0; i < height; i++) {
                let arr = []
                for (let j = 0; j < width; j++) {
                    arr.push(false);
                }
                played.push(arr);
                map.push(arr);
            }
            setBombs(bombMap);
            for (let i = 0; i < height; i++) {
                let arr = []
                for (let j = 0; j < width; j++) {
                    arr.push(decideBomb(numBombs, i, j, true));
                }
                game.push(arr);
            }
            setCounter(counter + 1)
            return;
        }
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
    }, [gameOver]);

    // React.useEffect(() =>{
    //     //run everytime click happens
    //     console.log(`Game: ${game.length}`);
    //     console.log(`Clicked: ${clickedArr.length}`);
    //     console.log(`Bombs: ${bombMap.length}`);
    //     if(game.length - clickedArr.length == bombMap.length){
    //         console.log('winner');
    //         setGameOver(true);
    //     }
    // }, [counter]);
    
    return (
        <div>
            <h1>Minesweeper</h1>
            <div style={style} className="Grid">{game}</div>
            <button onClick={()=>{console.log(map)}}>clgrid</button>
        </div>
    );
}

export default Grid;