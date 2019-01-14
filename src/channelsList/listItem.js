import React, { Component } from 'react';

class ListItem extends Component {

    constructor(props) {
        super(props);

        this.clickedItem = this.clickedItem.bind(this);
    }

    clickedItem(item) {
        this.props.onClick(item.id);
    }

    render() {
        return (
            <div style={styles.container} onClick={() =>  this.clickedItem(this.props.item)}>
                <p style={styles.text}>{this.props.item.name}</p>
            </div>
        );
    }
}

const styles = {
    container: {
        backgroundColor: "#2f2f31"
    },
    text: {
        color: "#e2e2e2"
    }
}

export default ListItem;