import { connect } from "react-redux";
import React, { Component } from "react";
import { fetchLeaderboard } from '../../actions'
import Leaderboard from 'react-leaderboard';

class LeaderBoardContentArea extends Component {
    constructor(props) {
        super(props);
        this.state = false
    }


    componentDidMount() {
        this.props.getData().then(res => {
            console.log('Usssssssssers', this.props.leaderBorder)
            let data = {
                users: [],
                paginate: 10
            }
            this.props.leaderBorder.forEach(val => {
                data.users.push({ name: `${val.firstName} ${val.lastName}`, score: val.points })
            })
            this.setState(data)
        })
    }




    render() {
        console.log('Rendeeeer', this.state.users)
        if (this.state) {
            return (
                <div className="content-area">
                    <Leaderboard users={this.state.users} paginate={this.state.paginate} />
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
