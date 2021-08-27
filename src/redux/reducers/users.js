const initialState = {
    currentUser: null,
    timeline: null,
}

export const user = (state=initialState, action) => {

    switch(action.type) {
        case 'USER_CHANGE':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'USER_TIMELINE_CHANGE':
            return {
                ...state,
                timeline: action.payload
            }
        default:
            return state;
    }
}