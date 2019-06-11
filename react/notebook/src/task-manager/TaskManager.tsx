import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import CreateTask from './create-task/CreateTask';
import TasksList from './task-list/TasksList';
import { Form } from './create-task/CreateTask';

import ModalDialog from '../modals/ModalDialog';
import LocalStorage from './local-storage/LocalStorage';

interface State {
  idCounter: number;
  data: {
    [id: number]: Form
  };
  form: Form;
  formStatus: 'add' | 'edit';
  formEditId: number;
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
      idCounter: 0,
      data: {},
      form: {
        ...this.clearForm
      },
      formStatus: 'add',
      formEditId: -1
    }
  }

  handleGetStorage = () => {
    let localData = LocalStorage.getItem('notes', true) || [],
        localIdCounter = Number(LocalStorage.getItem('idCounter')) || 0;

    this.setState({
      data: localData,
      idCounter: localIdCounter
    });
  };

  handleSetStorage = () => {
    LocalStorage.setItem('notes', this.state.data, true);
    LocalStorage.setItem('idCounter', this.state.idCounter);
  };

  handleAddFakeDate = () => {
    let task = {
      name: 'Задача',
      description: 'Описание',
      date: '12.03.12',
      status: STORE.statusNames[0],
      urgent: false
    };
    let id = this.state.idCounter,
        fakeData: any = {};
    for (let i = 0; i < 5; i++) {
      fakeData[id++] = task;
    }
    this.setState({
      data: fakeData,
      idCounter: id
    }, this.handleSetStorage);
  };

  handleClearForm = () => {
    this.setState({
      form: { ...this.clearForm },
      formStatus: 'add',
      formEditId: -1
    }, this.handleSetStorage);
  };

  handleClearTasksList = () => {
    ModalDialog.danger('Все записи будут удалены!', answer => {
      if (answer) {
        LocalStorage.removeItem('notes');
        LocalStorage.removeItem('idCounter');
        this.handleGetStorage();
      }
    });
  };

  handleAddTask = () => {
    let { data, formEditId: idEdit, idCounter: id }= this.state;

    if (idEdit > -1) id = idEdit;

    data[id] = { ...this.state.form };
    this.setState({
      data: { ...data },
      idCounter: id + 1,
      formEditId: -1
    }, this.handleSetStorage);

    this.handleClearForm();
  };

  handleEditTask = (id: number) => {
    let task = this.state.data[id];

    this.setState({
      form: { ...task },
      formEditId: id,
      formStatus: 'edit'
    });
  };

  handleDeleteTask = (id: number) => {
    let message = 'Вы действительно хотите удалить событие?';
    ModalDialog.danger(message, (answer: boolean) => {
      if (answer) {
        let data = this.state.data;
        delete data[id];
        this.setState({
          data: { ...data }
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
                        status={this.state.formStatus}
            />
          </Col>
          <Col xs={12} md={6} xl={8}>
            <TasksList data={this.state.data}
                       onEdit={this.handleEditTask}
                       onDelete={this.handleDeleteTask}
                       onClear={this.handleClearTasksList}
                       onFake={this.handleAddFakeDate}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}