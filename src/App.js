import React, { Component } from 'react';

import ChannelsList from "./channelsList/channelList";
import FeedsList from "./feedsList/feedsList";

const SERVER_URL = "http://localhost:8000";

const requestHeader = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json",
});

const requestOptions = {
    method: "GET",
    requestHeader,
    cache: "no-cache",
};

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rssFeeds: [],
            rssChannels: [],
            searchTerm: "",
        };

        this.fetchRssFeeds = this.fetchRssFeeds.bind(this);
        this.fetchRssChannels = this.fetchRssChannels.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChannelSelect = this.handleChannelSelect.bind(this);
    }

    componentDidMount() {
        this.fetchRssFeeds();
        this.fetchRssChannels();
    }


    fetchRssFeeds(search, channelId) {
        let FULL_URL = `${SERVER_URL}/rss/feeds/`;

        // if the user had entered something in the search box, append it to the request
        if (search) {
            FULL_URL = `${FULL_URL}?search=${search}`;
        }

        // if the user has selected a specific channel, retrieve only feeds for it
        if (channelId) {
            // we need to make sure if there is a search parameter alongside the channel so we can create a valid querystring
            if (search)
                FULL_URL = `${FULL_URL}&channel_id=${channelId}`;
            else
                FULL_URL = `${FULL_URL}?channel_id=${channelId}`;
        }

        fetch(FULL_URL,requestOptions).then(
                response => response.json())
            .then( (jsondata) => {
                this.setState({rssFeeds: jsondata});
                console.log(jsondata);
            })
            .catch((error) => {
                alert("Dogodila se greska :(");
            });
    }

    fetchRssChannels() {
        let FULL_URL = `${SERVER_URL}/rss/channels/`;
        
        fetch(FULL_URL,requestOptions).then(
            response => response.json())
        .then( (jsondata) => {
            this.setState({rssChannels: jsondata});
        })
        .catch((error) => {
            alert("Dogodila se greska :(");
        });
    }
    
    handleInputChange(event) {
        this.setState({searchTerm: event.target.value});

        if (event.key === "Enter") {
            this.fetchRssFeeds(event.target.value, null);
        }
    }

    handleChannelSelect(channelId) {
        this.fetchRssFeeds(this.state.searchTerm, channelId);
    }

    render() {
        return (
            <div style={styles.container}>

                <div style={styles.searchContainer}>
                    <input style={styles.searchInput} type="text" onKeyPress={this.handleInputChange} placeholder="Search..."/>
                </div>

                <div style={styles.listContainer}>
                    <div style={styles.listContainer1}>
                        <div style={styles.channelListContainer}>
                            <ChannelsList handleChannelSelect={this.handleChannelSelect}  data={this.state.rssChannels}/>
                        </div>

                        <div style={styles.feedsListContainer}>
                            <FeedsList data={this.state.rssFeeds}/>     
                        </div>
                    </div>
                </div>
        
            </div>
        
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#1c1b1b",
    },
    searchContainer: {
        display: 'flex',
        flex: 0.2,
        backgroundColor: "#1c1b1b",
        height: 50,
        justifyContent : "center",
        alignItem: "center",
        
    },
    searchInput: {
        height: 40,
        flex:0.4,
    },
    listContainer: {
        flex: 0.8,
        backgroundColor: "#1c1b1b",
    },
    listContainer1: {
        flex: 1,
        display: 'flex',
        backgroundColor: "#1c1b1b",
        flexDirection: "row",
    },
    channelListContainer: {
        flex: 0.2,
        backgroundColor: "#1c1b1b",
    },
    feedsListContainer: {
        flex: 0.8,
        backgroundColor: "#1c1b1b",
    }


}

export default App;
