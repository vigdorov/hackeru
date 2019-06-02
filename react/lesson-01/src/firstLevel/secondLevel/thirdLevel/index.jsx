import React from 'react';
import PropTypes from 'prop-types';
import { FamilyConsumer } from '../../../components/FamilyContext';

export default class Third extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func
  };

  render () {
    return (
      <FamilyConsumer>
        {
          (data) => {
            return (
              <div style={ {border: '1px solid white'} }>
                <input
                  type="text"
                  name="thirdInput"
                  value={ data.thirdInput }
                  onChange={this.props.handleChange}/>
              </div>
            );
          }
        }
      </FamilyConsumer>
    );
  }
}
