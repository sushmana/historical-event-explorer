import {put, takeEvery, call} from 'redux-saga/effects'
import {getEvent, setEvent, getBirth, setBirth}  from '../slice/historicalSlice';

function* getEventsData(params){
      let dd = params.payload.DD;
      let mm = params.payload.MM;
      let data  = yield call(fetch, "https://byabbe.se/on-this-day/"+mm+"/"+dd+ "/events.json");
      data =  yield data.json();
      yield put(setEvent(data))
}

function* getBirthData(params){

      let data  = yield call(fetch, "https://byabbe.se/on-this-day/5/6/births.json");
      data =  yield data.json();
      yield put(setBirth(data))
}

function* historicalSaga(){
      yield takeEvery(getEvent.type, getEventsData );
      yield takeEvery(getBirth.type, getBirthData );
}

export default historicalSaga;
