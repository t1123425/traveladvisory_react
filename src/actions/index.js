import {INCREMENT,DECREMENT,ADD,SEARCH,RESET,LOAD_DATA} from '../constants/actionType';
export const increment = () => {
    return {
        type: INCREMENT
    };
};

export const decrement = () => {
    return {
        type: DECREMENT
    };
};

export const search = infoData => {
    return {
        type:SEARCH,
        searchData:infoData
    }
}
export const reset = () => {
    return {
        type:RESET
    }
}
export const load_data = dataArray => {
    return {
        type:LOAD_DATA,
        dataAry:dataArray
    }
}

export const add = () => {
    return {
        type:ADD
    }
}


