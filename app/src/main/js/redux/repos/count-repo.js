export const COUNT_UP = "COUNT_UP";

export function countUp() {
    return {
        type: COUNT_UP,
    };
}

const initialState = {
    count: 0,
};

export function countReducer(state = initialState, action) {
    switch (action.type) {
        case COUNT_UP:
            return {...state, count: state.count + 1};
        default:
            // Do nothing
            break;
    }
    return state;
}
