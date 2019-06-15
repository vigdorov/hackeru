import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Navbar, Container } from 'react-bootstrap';

import './app.scss';
import logo from './img/logo.png';

import TaskManager from './task-manager/TaskManager';
import DragAndDrop from './drag-and-drop/DragAndDrop';
import LocalStorage from "./task-manager/local-storage/LocalStorage";
import * as appActions from "./store/action_creators";
import { connect } from "react-redux";

interface State {
  activeLink: string
}

interface Props {
  updateTask: (payload: any) => any;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeLink: '/'
    };
  }

  componentDidMount(): void {
    let data = LocalStorage.getItem('notes', true) || [],
        idCounter = Number(LocalStorage.getItem('idCounter')) || 0,
        { updateTask } = this.props;

    updateTask({data, idCounter});
  }

  handleClickNavLink = (event: any) => {
    let { href } = event.target;
    this.setState({
      activeLink: href
    })
  };

  isActiveLink = (id: string) => {
    return this.state.activeLink === id ? 'nav-item active' : 'nav-item';
  };

  render () {
    return (
      <Router>
        <Navbar bg="info" expand="sm">
          <Container>
            <Navbar.Brand href="#home">
              <img src={logo} alt="logo" width={30}/>
              {' Менеджер задач'}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <ul className="navbar-nav mr-auto">
                <li className={this.isActiveLink('/')}>
                  <Link className="nav-link" to='/' onClick={this.handleClickNavLink}>
                    Создать задачу
                  </Link>
                </li>
                <li className={this.isActiveLink('/tasks')}>
                  <Link className="nav-link" to='/tasks' onClick={this.handleClickNavLink}>
                    Работа с задачами
                  </Link>
                </li>
              </ul>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container style={{paddingTop: '15px'}}>
          <Route path='/' exact component={() => <TaskManager />} />
          <Route path='/tasks' component={() => <DragAndDrop />} />
        </Container>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTask: (payload: any) => dispatch(appActions.updateTask(payload)),
  };
};

export default connect(null, mapDispatchToProps)(App);
