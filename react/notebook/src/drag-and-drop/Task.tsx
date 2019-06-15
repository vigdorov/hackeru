import React, {Component} from 'react';
import { Form } from "../task-manager/create-task/CreateTask";
import { Card } from "react-bootstrap";
import { changeTaskStatus } from "../store/action_creators";
import { connect } from "react-redux";
import { STORE } from "../task-manager/TaskManager";

interface Props {
  data: Form;
  id: number;
  changeTaskStatus: (payload: {id: number, status: string}) => any;
  onStartDrag: (status: string) => void;
  onEndDrag: () => void;
}

class Task extends Component<Props, {}> {
  handleDragEnd = (e: any) => {
    let target = document.elementFromPoint(e.clientX, e.clientY),
        status = this.searchParentDiv(target),
      { id, changeTaskStatus } = this.props,
      { status: prevStatus } = this.props.data;
    if (status && status !== prevStatus) {
      changeTaskStatus({ id, status });
    }
    this.props.onEndDrag();
  };

  handleDragStart = (event: any) => {
    let { status } = this.props.data;
    this.props.onStartDrag(status);
  };

  searchParentDiv (element: any): string {
    if (element.id === 'expects') return STORE.statusNames[0];
    if (element.id === 'in-work') return STORE.statusNames[1];
    if (element.id === 'done')    return STORE.statusNames[2];
    if (element.parentNode === null) return '';
    else return this.searchParentDiv(element.parentNode);
  };

  render () {
    let { name, date } = this.props.data;
    return (
      <Card onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
            draggable
      >
        <Card.Body>
          <span >{ name }</span>
          <span> </span>
          <strong>{ date }</strong>
        </Card.Body>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeTaskStatus: (payload: any) => dispatch(changeTaskStatus(payload)),
  };
};

export default connect(null, mapDispatchToProps)(Task);
