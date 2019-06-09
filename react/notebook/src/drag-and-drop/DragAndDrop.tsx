import * as React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

export default class DragAndDrop extends React.Component<Props, State> {
  render () {
    return (
      <Container>
        <Row>
          <Col>В ожидании</Col>
          <Col>В работе</Col>
          <Col>Выполнены</Col>
        </Row>
      </Container>
    );
  }
}

interface Props {

}

interface State {

}