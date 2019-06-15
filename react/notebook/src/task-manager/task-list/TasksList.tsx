import React, {Component} from 'react';
import { connect } from 'react-redux';


import { Card, Button } from 'react-bootstrap';

import { Form } from '../create-task/CreateTask';

import Task from './component/Task';
import * as appActions from "../../store/action_creators";
import ModalDialog from "../../modals/ModalDialog";


interface Props {
  data: {
    [id: string]: Form;
  };
  deleteAllTask: () => void;
  createFakeTasks: () => void;
}

class TasksList extends Component<Props, {}> {
  handleClickClearButton = () => {
    let message = 'Все сообщения будут удалены!';
    ModalDialog.danger(message, (answer: boolean) => {

      if (answer) {
        this.props.deleteAllTask();
      }
    });
  };

  render () {
    let { data, createFakeTasks } = this.props,
      tasks: any[] = [];

    for (let key in data) {
      let id = Number(key);
      tasks.push(
        <Task id={ id }
              key={ id }
              data={ data[id] }
        />
      );
    }

    let clearButton = (
      <Button variant="warning"
              onClick={ this.handleClickClearButton }
      >
        Очистить список
      </Button>
    );

    let addFakeDataButton = (
      <Button variant="success"
              onClick={ createFakeTasks }
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

const mapStateToProps = (store: any) => {
  return {
    data: { ...store.app.data },
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteAllTask: () => dispatch(appActions.deleteAllTask()),
    createFakeTasks: () => dispatch(appActions.createFakeTasks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);