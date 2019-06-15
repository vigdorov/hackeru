import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import CreateTask from './create-task/CreateTask';
import TasksList from './task-list/TasksList';

export const STORE = {
  statusNames: [
    'В ожидании',
    'В работе',
    'Выполнена'
  ]
};

export default class TaskManager extends Component {

  render () {
    return (
      <Container>
        <Row>
          <Col xs={12} md={6} xl={4}>
            <CreateTask />
          </Col>
          <Col xs={12} md={6} xl={8}>
            <TasksList />
          </Col>
        </Row>
      </Container>
    );
  }
}