var initial_state = {
    is_authenticated : true,
    is_loading : false
};
export default function (state=initial_state, action){
    const {type, payload} = action;
    if(type === "LOGIN_PENDING"){
        return {
            ...state,
            is_loading: true
        }
    }
    else if(type === "LOGIN_FULFILLED"){
        const {data} = payload;
        if("error" in data){
            return {
                ...state,
                is_loading: false,
                is_authenticated: false
            }
        }
        else{
            console.log("no-error");
            return {
                ...state,
                is_loading: false,
                is_authenticated: true
            }
        }
    }
    return state;
}

