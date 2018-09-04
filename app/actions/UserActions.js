import * as types from './Types';
import Api from '../services/Api';


export function getUserList(params) {
    return (dispatch, getState) => {  
        dispatch(onUserListFetchInit());
        return Api.get(Api.API_USER_LIST+"?"+params ).then(resp => {
            if (resp) { 
                resp.isLoading = false;
                // do parsing data here
                console.log('User list resp ',resp)
                //resp.page = parseInt(resp.page)+1;
                let currentPage= parseInt(resp.page);
                let userData=currentPage>1?[...getState().users.data,...resp.data]:resp.data;
                let noMoreData =  (userData.length==resp.total)?true:false
                resp = Object.assign({},resp,{noMoreData}, {data:userData})
                dispatch(onUserListFetchSucess(resp))
               
            } else {
                dispatch(onUserListFetchFail({})) ;
            }
            
        }).catch((exception) => {
            dispatch(onUserListFetchFail(exception)) ;
        });
    };
}
export function onUserListFetchInit( ) {
    return {
        type: types.ON_USERLIST_INIT 
    };
}
export function onUserListFetchSucess(payload ) {
    return {
        type: types.ON_USERLIST_SUCCESS,
        payload
    };
}
export function onUserListFetchFail(error ) {
    return {
        type: types.ON_USERLIST_SUCCESS,
        error
    };
}
 