import {
    FETCH_PROFILE
} from "../actions/types";

const InitialState = {
    isFailed: false,
    items: []
};

const userReducer = function (state = InitialState, action) {
    console.log("the action is: " + action);
    switch (action.type) {
        case FETCH_PROFILE:
            return state;
        default:
            return state;
    }
};

export default userReducer;
