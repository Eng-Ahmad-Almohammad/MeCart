import { connect } from "react-redux";
import React, { Component } from "react";
import { fetchLeaderboard } from '../../actions'
// import Leaderboard from 'react-leaderboard';
import './style.css'
import CustomLeaderboard from './Leaderboard'


class LeaderBoardContentArea extends Component {
    constructor(props) {
        super(props);
        this.state = false
    }


    componentDidMount() {
        this.props.getData().then(res => {
          
            let data = {
                users: [],
                paginate: 5
            }
            this.props.leaderBorder.forEach(val => {
                data.users.push({ name: `${val.firstName} ${val.lastName}`, score: val.points, avatar: val.avatar })
            })
            this.setState(data)
        })
    }




    render() {
        
        if (this.state) {
            return (
                <div className="content-area-leader">
                    {/* <Leaderboard users={this.state.users} paginate={this.state.paginate} /> */}
                    <CustomLeaderboard users={this.state.users} paginate={this.state.paginate} />
                </div>
            );
        }
        return (
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
    getData: () => dispatch(fetchLeaderboard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardContentArea);
