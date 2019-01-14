import React, { Component } from 'react';

import ListItem from "./listItem";

class FeedsList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.data.map((item) => 
                    <ListItem key={item.id} item={item}/>
                )}
            </div>
        );
    }
}

export default FeedsList;