import {connect} from "react-redux";
import React, {Component} from "react";
import {fetchLeaderboard} from '../../actions'
import Leaderboard from 'react-leaderboard';

class LeaderBoardContentArea extends Component {
    constructor(props) {
        super(props);
        this.state = false
    }

    
    componentDidMount(){
        this.props.getData().then(res =>{
       console.log('Usssssssssers',this.props.leaderBorder)
       this.setState({
           users:[{name:`${this.props.leaderBorder[0].firstName} ${this.props.leaderBorder[0].lastName}`, score:this.props.leaderBorder[0].points},
        {name: `${this.props.leaderBorder[1].firstName} ${this.props.leaderBorder[1].lastName}`, score:this.props.leaderBorder[1].points}
        ],
        paginate:1
       })
        })
      }

      


    render() {
        console.log('Rendeeeer',this.state.users)
        if (this.state){
        return (
            <div className="content-area">
                <Leaderboard users={this.state.users} paginate={this.state.paginate}/>
            </div>
        );
        }
        return(
            <div className="content-area">
            Wait a minute
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    leaderBorder: state.leaderboard.leaderboard
});

const mapDispatchToProps = (dispatch) => ({
    getData:  () =>  dispatch(fetchLeaderboard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardContentArea);
