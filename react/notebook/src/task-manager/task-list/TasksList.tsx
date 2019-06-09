import React, {Component} from 'react';

import { Card } from 'react-bootstrap';

import { Form } from '../create-task/CreateTask';

import Task from './component/Task';

interface Props {
  data: Form[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default class TasksList extends Component<Props, {}> {
  render () {
    let { data } = this.props;
    return (
      <Card>
        <Card.Body>
          <Card.Title>Список задач:</Card.Title>
          { data.map( (task, i) => {
            return <Task data={task}
                         id={i}
                         key={i}
                         onEdit={this.props.onEdit}
                         onDelete={this.props.onDelete}
            />
          })}

        </Card.Body>
      </Card>
    );
  }
}
