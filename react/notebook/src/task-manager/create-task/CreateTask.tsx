import React, { Component } from 'react';

import { Row, Col, Card, Button } from 'react-bootstrap';

import { STORE } from '../TaskManager';
import InputGroup from './components/InputGroup';
import TextareaGroup from './components/TextareaGroup';
import SelectGroup from './components/SelectGroup';
import CheckboxGroup from './components/CheckboxGroup';

export interface Form {
  name: string;
  description: string;
  date: string;
  status: string;
  urgent: boolean;
}

interface Props {
  form: Form;
  onChange: (event: any) => string;
  onAddTask: () => void;
  onClearForm: () => void;
}

interface State {
  header: string;
  addButton: string;
  cancelButton: string;
}

export default class CreateTask extends Component<Props, State> {
  constructor (props: Props) {
    super(props);

    this.state = {
      header: 'Добавить событие',
      addButton: 'Добавить',
      cancelButton: 'Очистить'
    }
  }

  render () {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{this.state.header}</Card.Title>

          <InputGroup type="text"
                      label="Название события:"
                      value={this.props.form.name}
                      placeholder="Добавьте название"
                      id="name"
                      required={true}
                      onChange={this.props.onChange}
          />

          <TextareaGroup label="Описание:"
                         value={this.props.form.description}
                         id="description"
                         onChange={this.props.onChange}
                         placeholder="Добавьте описание"
                         rows={3}
                         cols={5}
          />

          <SelectGroup label='Статус события:'
                       value={STORE.statusNames.slice()}
                       choice={this.props.form.status}
                       id='status'
                       onChange={this.props.onChange}
          />

          <InputGroup type="text"
                      label="Дата события:"
                      value={this.props.form.date}
                      placeholder="Введите дату"
                      id="date"
                      required={true}
                      onChange={this.props.onChange}
          />

          <CheckboxGroup label="Важное событие"
                         value={this.props.form.urgent}
                         id="urgent"
                         onChange={this.props.onChange}
          />

          <Row>
            <Col>
              <Button variant="info"
                      onClick={this.props.onAddTask}
                      className="btn-block"
                      style={{ marginBottom: '10px' }}
              >
                {this.state.addButton}
              </Button>
            </Col>
            <Col>
              <Button variant="secondary"
                      onClick={this.props.onClearForm}
                      className="btn-block"
              >
                {this.state.cancelButton}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}