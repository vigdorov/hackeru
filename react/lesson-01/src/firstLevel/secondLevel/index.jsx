import React from 'react';
import Third from './thirdLevel';
import PropTypes from "prop-types";

export default class name extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func
  };

  render () {
    return (
      <Third
        value={this.props.value}
        handleChange={this.props.handleChange}
      />
    );
  }
}