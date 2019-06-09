import React, {Component} from 'react';

import { Button } from 'react-bootstrap';

import { Form } from '../../create-task/CreateTask';

import { Create, Delete, StarRate } from '@material-ui/icons';

import './task.scss';

interface Props {
  data: Form;
  id: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default class Task extends Component<Props, {}> {
  handleClickEdit = (event: any) => {
    event.preventDefault();

    let { id, onEdit } = this.props;
    onEdit(id);
  };

  handleClickDelete = (event: any) => {
    event.preventDefault();

    let { id, onDelete } = this.props;
    onDelete(id);
  };

  render () {
    let { data } = this.props;
    return (
      <ul className="list-group list-group-flush">
        <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span className="task__header">
            { data.urgent && <StarRate className="task__header-urgent"/> }
            <strong className="task__header-name">{ data.name }</strong>
          </span>
          <span>
            <Button variant="link"
                    onClick={this.handleClickEdit}
                    size="sm"
                    className="task__button-edit"
            >
              <Create />
            </Button>
            <Button variant="link"
                    onClick={this.handleClickDelete}
                    size="sm"
                    className="task__button-delete"
            >
              <Delete />
            </Button>
          </span>
        </li>
      </ul>
    );
  }
}
