import { Component } from 'react';
class Box extends Component{
    constructor(props){
        super(props)
        this.x = this.props.x;
        this.y = this.props.y;
        this.state = {
            displayType: 'none',
            hasClicked: false
        }
        this.number = 0;
    }
    getNeighborsBombs(foundBombs = 0){
        //x = j
        //y = i
        let Y = this.props.y;
        let X = this.props.x;
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
    showClicked(){
        let Y = this.props.y;
        let X = this.props.x;
        if (this.props.gameOver) {
            //TODO replace condition with if has been clicked
            if (!this.props.isBomb) {
                for (let i = 0; i < this.props.clickedArr.length; i++) {
                    if (this.props.clickedArr[i][0] == X && this.props.clickedArr[i][1] == Y) {
                        this.number = this.getBombs();
                        return true;
                    }
                }
            }
            return false;
        }
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
            this.props.bombClick();
            return;
        }
        this.setState({hasClicked: true});
        this.setState({displayType: 'grid'});
        this.number = this.getBombs();
    }
    render(){
        let displayBombsVar = this.showBombs();
        let displayClickedVar = this.showClicked();
        let displaying = displayBombsVar || displayClickedVar;
        const style1 = {
            display: `${displaying? 'grid' : this.state.displayType}`,

        }
        return(
            <div className="minContent">
                <button className={`button ${this.props.gameOver?'done':''} `} onClick={this.setClicked}><p style = {style1}>{this.number}</p></button>
            </div>
        )
    }
}
export default Box