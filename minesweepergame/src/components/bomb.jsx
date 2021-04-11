import Box from './box';
class Bomb extends Box{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Box x={this.props.x} y={this.props.y} isBomb={true} clickedArr={this.props.clickedArr} gameOver={this.props.gameOver} endGame={this.props.endGame} wasClicked={this.props.wasClicked}/>
            
        )
    }
}
export default Bomb;