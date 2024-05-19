import React, { Component } from 'react';

class Alert extends Component {
    render() {
        return (
            <div className= {"alert alert-" + this.props.type}>
                <h4>{this.props.header}</h4>
            </div>

            // <div className="alert alert-danger">
            //     {this.props.children}
            // </div>

            // <div className="alert alert-success">
            //     <h4>Info</h4>
            //     Belajar React JS itu menyenangkan
            // </div>
        )
    }
}

export default Alert;
