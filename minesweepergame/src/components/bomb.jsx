import Box from './box';
class Bomb extends Box{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Box isBomb={true} gameOver={this.props.gameOver} bombClick={this.props.bombClick} wasClicked={this.props.wasClicked}/>
            
        )
    }
}
export default Bomb;