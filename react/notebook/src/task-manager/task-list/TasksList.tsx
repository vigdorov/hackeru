import React, {Component} from 'react';

import { Card, Button } from 'react-bootstrap';

import { Form } from '../create-task/CreateTask';

import Task from './component/Task';

interface Props {
  data: {
    [id: number]: Form
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onClear: () => void;
  onFake: () => void;
}

export default class TasksList extends Component<Props, {}> {
  render () {
    let { data } = this.props,
      tasks: any[] = [];

    for (let key in data) {
      let id = Number(key);
      tasks.push(
        <Task data={data[id]}
              id={id}
              key={id}
              onEdit={this.props.onEdit}
              onDelete={this.props.onDelete}
        />
      );
    }

    let clearButton = (
      <Button variant="warning"
              onClick={this.props.onClear}
      >
        Очистить список
      </Button>
    );

    let addFakeDataButton = (
      <Button variant="success"
              onClick={this.props.onFake}
      >
        Наполнить список данными
      </Button>
    );

    return (
      <Card>
        <Card.Body>
          <Card.Title>Список задач:</Card.Title>
          { tasks }
        </Card.Body>
        <Card.Footer>
          { tasks[0] ? clearButton : addFakeDataButton }
        </Card.Footer>
      </Card>
    );
  }
}
