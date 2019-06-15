import React, { Component } from 'react';

import { Row, Col, Card, Button } from 'react-bootstrap';

import { STORE } from '../TaskManager';
import InputGroup from './components/InputGroup';
import TextareaGroup from './components/TextareaGroup';
import SelectGroup from './components/SelectGroup';
import CheckboxGroup from './components/CheckboxGroup';
import {connect} from "react-redux";
import * as appActions from "../../store/action_creators";


export interface Form {
  name: string;
  description: string;
  date: string;
  status: string;
  urgent: boolean;
}

interface Props {
  editId: number;
  data: {
    [id: number]: Form;
  };
  changeFormStatus: (payload: { id: number }) => any;
  addTask: (payload: Form) => any;
  editTask: (payload: Form) => any;
}

class CreateTask extends Component<Props, Form> {
  formStatus: number;
  clearForm: Form;

  constructor(props: Props) {
    super(props);

    this.clearForm = {
      name: '',
      description: '',
      date: '',
      status: STORE.statusNames[0],
      urgent: false
    };

    this.state = this.clearForm;

    this.formStatus = -1;
  }

  handleChange = (event: any) => {
    let id: string = event.target.id,
      value: string = event.target.value;

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }

    this.setState( prevState => {
      return {
        ...prevState,
        [id]: value
      }
    });
    return '';
  };

  handleClickButton = (e: any) => {
    let { id } = e.target;

    // Если нажата кнопка Отмена\Очистить
    if (id === 'cancel-button') {
      this.props.changeFormStatus({ id: -1 });
    }

    // Если нажата кнопка Добавить\Изменить
    if (id === 'add-button') {
      // Если статус формы = Добавить
      if (this.formStatus === -1) {
        this.props.addTask({ ...this.state });
        this.setState({ ...this.clearForm });
      } else {
        // Если статус формы = Изменить
        this.props.editTask({ ...this.state });
      }
    }
  };

  componentDidUpdate() {
    let { formStatus } = this,
        { editId, data } = this.props;

    if (formStatus !== editId) {
      let task = { ...this.clearForm };
      this.formStatus = editId;

      if (editId !== -1) {
        task = data[editId];
      }

      this.setState({
        ...task
      });
    }
  }

  render () {
    let { name, description, date, status, urgent } = this.state;
    let { handleChange, handleClickButton, formStatus } = this;

    let header = 'Добавить событие',
        addButton = 'Добавить',
        cancelButton = 'Очистить';

    if ( formStatus !== -1 ) {
      header = 'Редактировать событие';
      addButton = 'Изменить';
      cancelButton = 'Отмена';
    }

    return (
      <Card>
        <Card.Body>
          <Card.Title>{ header }</Card.Title>

          <InputGroup type="text"
                      label="Название события:"
                      value={ name }
                      placeholder="Добавьте название"
                      id="name"
                      required={ true }
                      onChange={ handleChange }
          />

          <TextareaGroup label="Описание:"
                         value={ description }
                         id="description"
                         onChange={ handleChange }
                         placeholder="Добавьте описание"
                         rows={3}
                         cols={5}
          />

          <SelectGroup label='Статус события:'
                       value={ STORE.statusNames.slice() }
                       choice={ status }
                       id='status'
                       onChange={ handleChange }
          />

          <InputGroup type="text"
                      label="Дата события:"
                      value={ date }
                      placeholder="Введите дату"
                      id="date"
                      required={ true }
                      onChange={ handleChange }
          />

          <CheckboxGroup label="Важное событие"
                         value={ urgent }
                         id="urgent"
                         onChange={ handleChange }
          />

          <Row>
            <Col>
              <Button variant={ formStatus === -1 ? 'info' : 'warning'}
                      onClick={ handleClickButton }
                      className="btn-block"
                      style={{ marginBottom: '10px' }}
                      id="add-button"
              >
                { addButton }
              </Button>
            </Col>
            <Col>
              <Button variant="secondary"
                      onClick={ handleClickButton }
                      className="btn-block"
                      id="cancel-button"
              >
                { cancelButton }
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (store: any) => {
  return {
    data: { ...store.app.data },
    editId: store.app.editId
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeFormStatus: (payload: any) => dispatch(appActions.changeFormStatus(payload)),
    addTask: (payload: any) => dispatch(appActions.addTask(payload)),
    editTask: (payload: any) => dispatch(appActions.editTask(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);