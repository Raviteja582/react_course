
/* It is a reducer Funtion Because it take current state and action to be formed on current state as parameters. */

import * as ActionTypes from './ActionTypes';
export const Dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                dishes: action.payload
            };

        case ActionTypes.DISHES_LOADING:
            return {
                ...state,    // ... sprint operator used for copying the current state before modifying,
                isLoading: true,
                errMess: null,
                dishes: []
            }

        case ActionTypes.DISHES_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                dishes: []
            };

        default:
            return state;
    }
};
