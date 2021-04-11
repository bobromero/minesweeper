import { Component } from 'react';
class Box extends Component{
    constructor(props){
        super(props)
        this.x = this.props.x;
        this.y = this.props.y;
        this.state = {
            displayType: 'none'
        }
        this.number = 0;
    }
    getNeighborsBombs(foundBombs = 0){
        //x = j
        //y = i
        let Y = this.props.y
        let X = this.props.x
        let gameMap = this.props.mapP
        //*terinary used to decide if it should look spaces above or below, used to get around error out of bounds
        for (let i = Y > 0 ? -1 : 0; i <= (Y == gameMap.length - 1 ? 0 : 1); i++) {
            for (let j = -1; j <= 1; j++) {
                if(gameMap[Y + i][X + j] == true){
                    foundBombs++;
                }
            }
        }
        return foundBombs;
    }
    getBombs(){
        ////generate map first, then set bombs based on the map, not vice versa
        return this.getNeighborsBombs();
    }
    setClicked = () => {
        if(this.props.isBomb){
            this.setState({displayType: 'grid'})
            this.number = '💣︎';
            return;
        }
        this.setState({displayType: 'grid'})
        this.number = this.getBombs();
    }
    render(){
        return(
            <div className="minContent">
                <button className="button" onClick={this.setClicked}><p style = {{display: `${this.state.displayType}`}}>{this.number}</p></button>
            </div>
        )
    }
}
export default Box