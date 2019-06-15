import * as ACT from './actions';
import { store } from '../index';
import LocalStorage from "../task-manager/local-storage/LocalStorage";

function setStorage (app) {
  let { data, idCounter } = app;
  if (data) LocalStorage.setItem('notes', data, true);
  if (idCounter) LocalStorage.setItem('idCounter', idCounter);
}

export function addTask (payload) {
  let data = { ...store.getState().app.data },
      id = store.getState().app.idCounter;

  data[id++] = { ...payload };
  setStorage({ data, idCounter: id });

  return {
    type: ACT.DATA_TASK_ADD,
    payload: {
      data: { ...data },
      idCounter: id,
      editId: -1
    }
  };
}

export function editTask (payload) {
  let data = { ...store.getState().app.data },
      id = store.getState().app.editId;

  data[id] = { ...payload };
  setStorage( {data});

  return {
    type: ACT.DATA_TASK_EDIT,
    payload: {
      data: { ...data },
      editId: -1
    }
  };
}

export function deleteTask (payload) {
  let data = {
    ...store.getState().app.data
  };
  delete data[payload.id];
  setStorage({ data });
  return {
    type: ACT.DATA_TASK_DELETE,
    payload: {
      data: { ...data }
    }
  };
}

export function updateTask (payload) {
  return {
    type: ACT.DATA_TASK_UPDATE,
    payload
  };
}

export function changeFormStatus (payload) {
  return {
    type: ACT.FORM_CHANGE_STATUS,
    payload: {
      editId: payload.id
    }
  };
}

export function createFakeTasks () {
  let data = {};

  let i = 0;
  for (; i < 5; i++) {
    data[i] = {
      name: 'Задача' + i,
      description: 'Какое-то описание №' + i,
      date: '0' + i + '.05.2019',
      status: 'В ожидании',
      urgent: i % 2 === 0
    }
  }
  setStorage({ data, idCounter: i });
  return {
    type: ACT.DATA_CREATE_FAKE_TASKS,
    payload: {
      data: { ...data },
      idCounter: 5
    }
  };
}

export function deleteAllTask () {
  setStorage({ data: {}, idCounter: 0 });
  return {
    type: ACT.DATA_DELETE_ALL,
    payload: {
      data: {},
      idCounter: 0,
      editId: -1
    }
  }
}

export function changeTaskStatus (payload) {
  let { data } = store.getState().app,
      { id, status } = payload;

  data[id].status = status;
  setStorage({ data });

  return {
    type: ACT.DATA_TASK_CHANGE_STATUS,
    payload: {
      data: { ...data }
    }
  }
}