import React, { Component } from 'react';

class EmptyLayout extends Component {
  render() {
    return (
        <React.Fragment>
            {this.props.children}
        </React.Fragment>
    )
  }
}
export default EmptyLayout;
