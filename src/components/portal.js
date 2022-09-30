import React, {Component} from 'react';
import ReactDOM from 'react-dom';
/* global console , $ , document */
/* eslint-disable no-console */
const portalRoot = ReactDOM.createElement(document.getElementById('portal'));
    


export default class Portal extends React.Component {

    constructor() {
        super();
        this.el = React.createElement('div');  
    }

    componentDidMount = () => {
        portalRoot.appendChild(this.el);
    }

    
    componentWillUnmout = () => {
        portalRoot.removeChild(this.el);
    }

    render() { 
        const {children} = this.props;   
        return ReactDOM.createPortal(children, this.el);
    }
}
