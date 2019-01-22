export default function(state = {filter: {}, list: [] }, actions) {
    switch(actions.type) {
        case 'FETCH_LIST':
            return {
                filter: {
                    languageList: actions.payload[0]
                },
                movieList: actions.payload[1],
                initList: actions.payload[1]
            }
        case 'FILTER_ITEMS':
            if (actions.selectedList.length === 0) {
                return Object.assign({}, state, { movieList: state.initList })
            }
            else {
                let filteredList = {};

                for (let item in state.initList) {
                    if (actions.selectedList.indexOf(state.initList[item].EventLanguage) > -1) {
                        filteredList[item] = state.initList[item];
                    }
                }

                return Object.assign({}, state, { movieList: filteredList })
            }
        default:
            return state;
    }
}