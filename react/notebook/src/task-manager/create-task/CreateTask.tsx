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
  status: 'add' | 'edit'
}

export default class CreateTask extends Component<Props, {}> {
  render () {
    let { status, form, onChange, onAddTask, onClearForm } = this.props;

    let header = 'Добавить событие',
        addButton = 'Добавить',
        cancelButton = 'Очистить';

    if (status === 'edit') {
      header = 'Редактировать событие';
      addButton = 'Изменить';
      cancelButton = 'Отмена';
    }

    return (
      <Card>
        <Card.Body>
          <Card.Title>{header}</Card.Title>

          <InputGroup type="text"
                      label="Название события:"
                      value={form.name}
                      placeholder="Добавьте название"
                      id="name"
                      required={true}
                      onChange={onChange}
          />

          <TextareaGroup label="Описание:"
                         value={form.description}
                         id="description"
                         onChange={onChange}
                         placeholder="Добавьте описание"
                         rows={3}
                         cols={5}
          />

          <SelectGroup label='Статус события:'
                       value={STORE.statusNames.slice()}
                       choice={form.status}
                       id='status'
                       onChange={onChange}
          />

          <InputGroup type="text"
                      label="Дата события:"
                      value={form.date}
                      placeholder="Введите дату"
                      id="date"
                      required={true}
                      onChange={onChange}
          />

          <CheckboxGroup label="Важное событие"
                         value={form.urgent}
                         id="urgent"
                         onChange={onChange}
          />

          <Row>
            <Col>
              <Button variant={ status === 'add' ? 'info' : 'warning'}
                      onClick={onAddTask}
                      className="btn-block"
                      style={{ marginBottom: '10px' }}
              >
                {addButton}
              </Button>
            </Col>
            <Col>
              <Button variant="secondary"
                      onClick={onClearForm}
                      className="btn-block"
              >
                {cancelButton}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}