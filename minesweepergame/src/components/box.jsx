import { Component } from 'react';
class Box extends Component{
    constructor(props){
        super(props)
        
        this.hasClicked = false;
        this.state = {
            displayType: 'none'
        }
        this.number = 0;
    }
    getNeighborsBombs(foundBombs = 0){
        //x = j
        //y = i
        let X = this.props.x;
        let Y = this.props.y;
        let gameMap = this.props.mapP;
        //*terinary used to decide if it should look spaces above or below, used to get around error out of bounds
        for (let i = Y > 0 ? -1 : 0; i <= (Y === gameMap.length - 1 ? 0 : 1); i++) {
            for (let j = -1; j <= 1; j++) {
                if(gameMap[Y + i][X + j] === true){
                    foundBombs++;
                }
            }
        }
        return foundBombs;
    }
    getBombs(){
        ////generate map first, then set bombs based on the map, not vice versa
        //TODO switch neighboring 0's to click as well
        return this.getNeighborsBombs();
    }
    showBombs(){
        if (this.props.gameOver) {
            if(this.props.isBomb){
                this.number = '💣︎';
                return true;
            }
        }
        return false;
    }
    isClicked(){
        let X = this.props.x;
        let Y = this.props.y;
        for (let i = 0; i < this.props.clickedArr.length; i++) {
            if (this.props.clickedArr[i][0] == X && this.props.clickedArr[i][1] == Y) {
                return true;
            }
        }
        return false;
    }
    showClicked(){
        if (this.props.gameOver) {
            //TODO replace condition with if has been clicked
            if (!this.props.isBomb && this.isClicked()) {
                this.number = this.getBombs();
                return true;
            }
        }
        return false;
    }
    setClicked = () => {
        //TODO Give something to class that allows it to be distinguished as clicked. If bomb come up as red, if not just gray. reference it in showbombs/showclicked so the
        this.props.wasClicked(this.props.x, this.props.y);
        ////replace with reaveal bombs
        if(this.props.gameOver){
            return;
        }
        if(this.props.isBomb){
            this.setState({displayType: 'grid'})
            this.number = '💣︎';
            // console.log(this.props);
            this.props.endGame('loser');
            return;
        }
        this.hasClicked = true;
        this.setState({displayType: 'grid'});
        this.number = this.getBombs();
    }
    getFont(){
        switch (this.number) {
            case 0:
                return "#a7a7a7"
            case 1:
                return "blue"
            case 2:
                return "green"
            case 3:
                return "red"
            case 4:
                return "darkblue"
            case 5:
                return "darkred"
            case 6:
                return "teal"
            case 7:
                return "black"
            case 8:
                return "grey"
        
            default:
                return "black"
        }
    }
    render(){
        let displayBombsVar = this.showBombs();
        let displayClickedVar = this.showClicked();
        let displaying = displayBombsVar || displayClickedVar;
        let fontColor = 'black'
        if (this.state.displayType == 'grid') {
            fontColor = this.getFont();
        }
        if(this.props.gameOver){
            fontColor = this.getFont();
            if (this.props.isBomb) {
                // console.log(this.getFont())
            }
            this.hasClicked=this.isClicked();
        }

        
        const style1 = {
            display: `${displaying? 'grid' : this.state.displayType}`,
            color: `${fontColor}`
        }
        return(
            <div className="minContent">
                <button className={`button ${this.props.gameOver?'done':''} ${this.hasClicked?this.props.isBomb?'clicked bomb':'clicked':''}`} onClick={this.setClicked}><p style = {style1}>{this.number}</p></button>
            </div>
        )
    }
}
export default Box