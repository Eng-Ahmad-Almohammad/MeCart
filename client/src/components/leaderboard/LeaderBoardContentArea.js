import {connect} from "react-redux";
import React, {Component} from "react";

import Leaderboard from 'react-leaderboard';

class LeaderBoardContentArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{name: "Bob", score: 10},
                {name: "sara", score: 100},
                {name: "sally", score: 50},
                {name: "tom", score: 60},],
            paginate: 1
        };
    }
    render() {
        return (
            <div className="content-area">
                <Leaderboard users={this.state.users} paginate={this.state.paginate}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardContentArea);
