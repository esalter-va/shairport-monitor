import React from 'react'
import io from 'socket.io-client'

export default class App extends React.Component {
    render() {
        var socket = io()
        return <h1>Hello, world!</h1>
    }
}