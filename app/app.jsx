import React from 'react'
import io from 'socket.io-client'

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {}
        var socket = io()
        socket.on('metadata', msg => {
            this.setState({metadata: msg})
        })
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <div>{ JSON.stringify(this.state.metadata) }</div>
            </div>
        )
    }
}