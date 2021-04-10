import Box from './box';
class Bomb extends Box{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <Box isBomb={true}/>
        )
    }
}
export default Bomb;