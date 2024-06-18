import {createStore,combineReducers} from 'redux';
import BookReducer from './reducers/BookReducer'
const rootReducer=combineReducers({
    bookReducer:BookReducer,
})
const store=createStore(rootReducer);
export default store;
