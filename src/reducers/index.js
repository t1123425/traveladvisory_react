import dataReducer from './dataReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    travelDataArray:dataReducer
})

export default allReducers;