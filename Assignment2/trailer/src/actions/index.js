export const fetchTrailers = () => dispatch => {
    fetch('../data.json')
    .then(res => res.json())
    .then(data => dispatch({
        type: 'FETCH_LIST',
        payload: data
    }))
}

export const filterItems = (selectedList) => dispatch => {
    debugger
    dispatch({
        type: 'FILTER_ITEMS',
        selectedList
    });
}