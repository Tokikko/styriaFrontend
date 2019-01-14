import React, { Component } from 'react';

import ListItem from "./listItem";

class ChanneslList extends Component {

    constructor(props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(id) {
        this.props.handleChannelSelect(id);

    }
    
    render() {
        return (
            <div>
                {this.props.data.map((item) => 
                    <ListItem key={item.id} item={item} onClick={this.handleItemClick}/>
                )}
            </div>
        );
    }
}

export default ChanneslList;
