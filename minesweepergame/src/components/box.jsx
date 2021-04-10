import { Component } from 'react';
class Box extends Component{
    constructor(props){
        super(props)
        this.state = {
            displayType: 'none'
        }
        this.number = '';
    }
    getBombs(){
        return 0;
    }
    setClicked = () => {
        console.log(this.props.isBomb)
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
            <div>
                <button className="button" onClick={this.setClicked}><p style = {{display: `${this.state.displayType}`}}>{this.number}</p></button>
            </div>
        )
    }
}
export default Box