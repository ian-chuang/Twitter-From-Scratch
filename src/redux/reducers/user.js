const initialState = {
    loading: true,
    user: null,
}

export default function userReducer(state=initialState, action) {
    switch(action.type) {
        case 'CHANGE_USER':
            return {...state, user: action.payload};
        case 'CHANGE_LOADING':
            return {...state, loading: action.payload}
        default:
            return state;
    }
}