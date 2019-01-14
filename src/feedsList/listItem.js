import React, { Component } from 'react';

class ListItem extends Component {

    constructor(props) {
        super(props);

        this.clickedItem = this.clickedItem.bind(this);
    }

    clickedItem(item) {
        window.open(item.link,'_blank');
    }

    render() {

        const formatedDate = new Date(this.props.item.pub_date);

        // since the img is stored as a html element we need to extract to src info
        let regexMatches = this.props.item.image.match(/\"(.*?)\"/);

        // following the format, the src should always be the first tag in the html
        let imageSrc = regexMatches && regexMatches.length ? regexMatches[1] : '';

        return (
            <div style={styles.container} onClick={() =>  this.clickedItem(this.props.item)}>
                <img style={styles.image} src={imageSrc}/>
                <p style={styles.text}>{this.props.item.title}</p>
                <p style={styles.text}>{this.props.item.description}</p>
                <p style={styles.text}>{`Datum objave: ${formatedDate.getDate()}-${formatedDate.getMonth() + 1}-${formatedDate.getFullYear()}`}</p>
                <p style={styles.text}>{this.props.item.link}</p>
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
    },
    image: {
        width: 300,
        height: 200,
    }
}

export default ListItem;