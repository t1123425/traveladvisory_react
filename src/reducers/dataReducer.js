import State from '../state.js';
import {LOAD_DATA,SEARCH,RESET} from '../constants/actionType';
const initialState = State;
const dataReducer = (state = initialState.travelData, action) => {
    switch(action.type){
        case LOAD_DATA:
            return [...state, action.dataAry];
        case RESET:
            return [];
        case SEARCH:
            let filterArray = [];
            if(action.searchData === ''){
                filterArray = state[0];
            }else{
                filterArray = state[0].filter((items) => {
                    return items.location === action.searchData
                });
            }
            return[filterArray];
        default:
            return state;
    }
}

export default dataReducer;