import * as types from '../actions/Types'
import createReducer from './ReducerFactory'


 
//USERS LIST
const defaultUsersState = {
  isLoading: false,
  page: 1,
  per_page: 5,
  data: [],
  total_pages:0,
  total:0,
  error: {},
  noMoreData:false
}

export const users = createReducer(defaultUsersState,
  {
    [types.ON_USERLIST_INIT](state, action) {
        return {
          ...state, 
          isLoading: true
        };
      },
      [types.ON_USERLIST_SUCCESS](state, action) {
        return {
          ...state,
          ...action.payload,
          isLoading: false
        };
      },
      [types.ON_USERLIST_FAIL](state, action) {
        return {
          ...state,
          ...action.error, 
          isLoading: false
        };
    }

  });
 