import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button } from 'react-bootstrap';

interface Callback {
  (answer: boolean): void;
}

interface Param {
  header: string;
  message: string;
  callback: Callback;
  variant: 'success' | 'info' | 'danger';
}

class ModalController {
  private static _instance: ModalController = new ModalController();
  private counter: number;

  constructor () {
    this.counter = 0;

    return ModalController._instance;
  }

  question (text: string, callbackAnswer: Callback) {
    this._render({
      header: 'Вопрос',
      message: text,
      callback: callbackAnswer,
      variant: 'success'
    });
  }

  info (text: string, callbackAnswer: Callback) {
    this._render({
      header: 'Информация',
      message: text,
      callback: callbackAnswer,
      variant: 'info'
    });
  }

  danger (text: string, callbackAnswer: Callback) {
    this._render({
      header: 'Внимание!',
      message: text,
      callback: callbackAnswer,
      variant: 'danger'
    });
  }

  private _render (param: Param) {

    ReactDOM.render(
      <ModalView key={this.counter++} {...param}/>,
      document.getElementById('modals__modal-dialog')
    );
  }
}

interface State {
  show: boolean;
}

class ModalView extends Component<Param, State> {
  constructor (props: Param) {
    super(props);

    this.state = {
      show: true
    };
  }

  handleCancel = () => {
    this.setState({ show: false });
    this.props.callback(false);
  };

  handleSuccess = () => {
    this.setState({ show: false });
    this.props.callback(true);
  };

  render () {
    return (
      <Modal show={this.state.show} onHide={this.handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCancel}>
            Отмена
          </Button>
          <Button variant={this.props.variant} onClick={this.handleSuccess}>
            Согласен
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default new ModalController();
