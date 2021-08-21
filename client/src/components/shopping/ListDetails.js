import React, { Component } from "react";

class ListDetails extends Component {
    render() {
        return <h1>Content for list {'>>>'} {this.props.listId}</h1>
    }
}

export default ListDetails;
