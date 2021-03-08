/**
 * @description:出口
 */
import { combineReducers } from 'redux';
import todos from './todos';
import token from './token';
import visibilityFilter from './visibilityFilter';

const reducers = combineReducers({
    todos,
    token,
    visibilityFilter
})
export default reducers