import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as ACT from './actions';

// Первичная инициализация GLOBAL STORE
const initialState = {
  idCounter: 0,
  data: {},
  editId: -1
};

function rootReducer (store = initialState, action) {
  switch (action.type) {
    case ACT.DATA_TASK_ADD:
      return { ...store, ...action.payload };
    case ACT.DATA_TASK_EDIT:
      return { ...store, ...action.payload };
    case ACT.DATA_TASK_DELETE:
      return { ...store, ...action.payload };
    case ACT.DATA_TASK_UPDATE:
      return { ...store, ...action.payload };
    case ACT.FORM_CHANGE_STATUS:
      return { ...store, ...action.payload };
    case ACT.DATA_DELETE_ALL:
      return { ...store, ...action.payload };
    case ACT.DATA_CREATE_FAKE_TASKS:
      return { ...store, ...action.payload };
    case ACT.DATA_TASK_CHANGE_STATUS:
      return { ...store, ...action.payload };
    default:
      return store;
  }
}

export default (history) => combineReducers({
  router: connectRouter(history),
  app: rootReducer,
});