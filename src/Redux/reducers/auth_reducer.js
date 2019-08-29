var initial_state = {
  is_authenticated: false,
  is_loading: false,
  is_session_active: false
};
export default function(state = initial_state, action) {
  // console.log(action);
  const { type, payload } = action;
  if (type === "LOGIN_PENDING" || type === "IS_ACTIVE_PENDING") {
    return {
      ...state,
      is_loading: true
    };
  } else if (type === "LOGIN_FULFILLED") {
    const { data } = payload;
    if ("error" in data) {
      return {
        ...state,
        is_loading: false,
        is_authenticated: false
      };
    } else if ("login" in data) {
      return {
        ...state,
        is_loading: false,
        is_authenticated: true
      };
    }
  }
  if (type === "IS_ACTIVE_FULFILLED") {
    const { data } = payload;
    if ("logged" in data && data["logged"] === true) {
      return {
        ...state,
        is_loading: false,
        is_authenticated: true
      };
    } else {
      return {
        ...state,
        is_loading: false,
        is_authenticated: false
      };
    }
  }

  return state;
}
