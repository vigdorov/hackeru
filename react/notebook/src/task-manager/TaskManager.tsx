import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import CreateTask from './create-task/CreateTask';
import TasksList from './task-list/TasksList';
import { Form } from './create-task/CreateTask';

import ModalDialog from '../modals/ModalDialog';

interface State {
  data: Form[];
  form: Form;
}

export const STORE = {
  statusNames: [
    'В ожидании',
    'В работе',
    'Выполнена'
  ]
};

export default class TaskManager extends Component<{}, State> {
  clearForm: Form;

  constructor (props: {}) {
    super(props);

    this.clearForm = {
      name: '',
      description: '',
      date: '',
      status: STORE.statusNames[0],
      urgent: false
    };

    this.state = {
      data: [],
      form: {
        ...this.clearForm
      }
    }
  }

  handleGetStorage = () => {
    let localData = localStorage.getItem('notes') || '[]';
    let parseData = JSON.parse(localData);
    this.setState({
      data: parseData
    });
  };

  handleSetStorage = () => {
    let notes = JSON.stringify(this.state.data);
    localStorage.setItem('notes', notes);
  };

  handleClearForm = () => {
    this.setState({
      form: { ...this.clearForm }
    }, this.handleSetStorage);
  };

  handleAddTask = () => {
    let prevData = this.state.data.slice();
    prevData.push( {...this.state.form} );

    this.setState({
      data: prevData,
    }, this.handleClearForm);
  };

  handleEditTask = (id: number) => {
    this.setState({
      form: {
        ...this.state.data[id]
      }
    });
  };

  handleDeleteTask = (id: number) => {
    let message = 'Вы действительно хотите удалить событие?';
    ModalDialog.danger(message, (answer: boolean) => {
      if (answer) {
        this.setState(prevState => {
          let newData = prevState.data.slice();
          newData.splice(id, 1);
          return {
            data: newData
          };
        }, this.handleSetStorage);
      }
    });
  };

  handleChange = (event: any) => {
    let id: string = event.target.id,
        value: string = event.target.value;

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }

    this.setState( prevState => {
      return {
        form: {
          ...prevState.form,
          [id]: value
        }
      }
    });
    return '';
  };

  componentDidMount() {
    this.handleGetStorage();
  }

  render () {
    return (
      <Container>
        <Row>
          <Col xs={12} md={6} xl={4}>
            <CreateTask form={this.state.form}
                        onChange={this.handleChange}
                        onAddTask={this.handleAddTask}
                        onClearForm={this.handleClearForm}
            />
          </Col>
          <Col xs={12} md={6} xl={8}>
            <TasksList data={this.state.data}
                       onEdit={this.handleEditTask}
                       onDelete={this.handleDeleteTask}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}