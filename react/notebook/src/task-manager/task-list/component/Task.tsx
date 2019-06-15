import React, {Component} from 'react';

// Загружаем необходимые данные для работы с Redux
import { connect } from 'react-redux';
import * as appActions from '../../../store/action_creators';


import { Button } from 'react-bootstrap';
import { Create, Delete, StarRate } from '@material-ui/icons';
import './task.scss';

import { Form } from '../../create-task/CreateTask';
import ModalDialog from "../../../modals/ModalDialog";

interface Props {
  id: number;
  data: Form;
  changeFormStatus: (payload: { id: number }) => void;
  deleteTask: (obj: any) => void;
}

class Task extends Component<Props, {}> {

  handleClickEdit = (event: any) => {
    event.preventDefault();

    let { id, changeFormStatus } = this.props;
    changeFormStatus({ id });
  };

  handleClickDelete = (event: any) => {
    event.preventDefault();

    let message = 'Вы действительно хотите удалить событие?';
    ModalDialog.danger(message, (answer: boolean) => {

      if (answer) {
        let { id, deleteTask } = this.props;
        deleteTask({ id });
      }
    });
  };

  render () {
    let { urgent, name } = this.props.data,
        { handleClickEdit, handleClickDelete } = this;

    return (
      <ul className="list-group list-group-flush">
        <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span className="task__header">
            { urgent && <StarRate className="task__header-urgent"/> }
            <strong className="task__header-name">{ name }</strong>
          </span>
          <span>
            <Button variant="link"
                    onClick={ handleClickEdit }
                    size="sm"
                    className="task__button-edit"
            >
              <Create />
            </Button>
            <Button variant="link"
                    onClick={ handleClickDelete }
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteTask: (payload: any) => dispatch(appActions.deleteTask(payload)),
    changeFormStatus: (payload: any) => dispatch(appActions.changeFormStatus(payload)),
  };
};

export default connect(null, mapDispatchToProps)(Task);
