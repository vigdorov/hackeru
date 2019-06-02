import React from 'react';
import Second from './secondLevel';
import PropTypes from "prop-types";

export default class name extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func
  };

  render () {
    return (
      <Second
        value={this.props.value}
        handleChange={this.props.handleChange}
      />
    );
  }
}