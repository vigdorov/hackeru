import React from 'react';
import PropTypes from 'prop-types';

export default class Body extends React.Component {

  static propTypes = {
    bodyText: PropTypes.string,
    person: PropTypes.shape({
      name: PropTypes.string,
      age: PropTypes.number
    })
  };

  static defaultProps = {
    bodyText: 'Вы не ввели текст у компонента'
  };

  render () {
    return (
      <div>{ this.props.bodyText }
      Пользователь: { this.props.person.name }
      Возраст: { this.props.person.age }</div>
    );
  }
}

/*
первый вариант как у функции:
Body.propTypes = {
  bodyText: PropTypes.string
};*/
