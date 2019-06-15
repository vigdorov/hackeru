import * as React from 'react';

import { Container, Row, Col, Card } from 'react-bootstrap';
import './style.scss';
import { connect } from "react-redux";
import { Form } from "../task-manager/create-task/CreateTask";
import { STORE } from "../task-manager/TaskManager";
import Task from './Task';

interface Props {
  data: {
    [id: number]: Form;
  };
}

interface State {
  leftBorder: 'border border-success' | '';
  centerBorder: 'border border-success' | '';
  rightBorder: 'border border-success' | '';
}

class DragAndDrop extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      leftBorder: '',
      centerBorder: '',
      rightBorder: ''
    }
  }

  handleDrag = (status: string) => {
    let setColor = {
      leftBorder: 'border border-success',
      centerBorder: 'border border-success',
      rightBorder: 'border border-success'
    };

    if (status === STORE.statusNames[0]) delete setColor.leftBorder;
    if (status === STORE.statusNames[1]) delete setColor.centerBorder;
    if (status === STORE.statusNames[2]) delete setColor.rightBorder;

    this.setState((prevState: any) => {
      return {
        ...prevState,
        ...setColor
      };
    });
  };

  handleDrop = () => {
    this.setState ({
      leftBorder: '',
      centerBorder: '',
      rightBorder: ''
    });
  };

  render () {
    let { data } = this.props,
        { leftBorder, centerBorder, rightBorder } = this.state,
          left: any[] = [],
          center: any[] = [],
          right: any[] = [];

    for (let id in data) {

      let { status } = data[id],
          { statusNames } = STORE,
            task = <Task key={ id }
                         data={ data[id] }
                         id={ Number(id) }
                         onStartDrag={ this.handleDrag }
                         onEndDrag={ this.handleDrop }
            />;

      if (status === statusNames[0]) left.push(task);
      if (status === statusNames[1]) center.push(task);
      if (status === statusNames[2]) right.push(task);

    }
    return (
      <Container>
        <Row>
          <Col>
            <Card className={"drag-col " + leftBorder} id="expects">
              <Card.Body>
                <h4>В ожидании</h4>
                { left }
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className={"drag-col " + centerBorder} id="in-work">
              <Card.Body>
                <h4>В работе</h4>
                { center }
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className={"drag-col " + rightBorder} id="done">
              <Card.Body>
                <h4>Выполнены</h4>
                { right }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (store: any) => {
  return {
    data: { ...store.app.data },
  };
};

export default connect(mapStateToProps)(DragAndDrop);