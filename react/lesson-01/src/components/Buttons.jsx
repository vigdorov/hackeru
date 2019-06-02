import React from 'react';
import PropTypes from 'prop-types';

export default function Buttons (props) {
  return (
    <React.Fragment>
      <button onClick={ () => props.handleClick(1)}>+</button>
      <button onClick={ () => props.handleClick(-1)}>-</button>
    </React.Fragment>
    );
}

Buttons.propTypes = {
  handleClick: PropTypes.func.isRequired
};