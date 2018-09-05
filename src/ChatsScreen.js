import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'

class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {}
        }
    }

    componentDidMount () {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:0071078a-4454-426a-96df-41cfc0c2f68f'
        })
    }
    render() {
        return (
            <div>
                <h1>Chat</h1>
            </div>
        )
    }
}

export default ChatScreen