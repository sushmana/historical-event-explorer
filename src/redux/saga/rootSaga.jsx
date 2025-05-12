import { all } from 'redux-saga/effects';
import historical from './historicalSaga';
import { unstable_HistoryRouter } from 'react-router-dom';

export default function* rootSaga() {
  yield all([
      historical(),
  ]);
}
