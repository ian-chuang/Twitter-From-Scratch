export const changeUser = (user) => {
    return {
        type: 'CHANGE_USER',
        payload: user,
    }
}

export const changeLoading = (loading) => {
    return {
        type: 'CHANGE_LOADING',
        payload: loading,
    }
}

export const toggleTheme = () => {
    return {
        type: 'TOGGLE_THEME'
    }
}
