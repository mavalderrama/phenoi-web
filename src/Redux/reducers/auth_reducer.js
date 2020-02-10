var initial_state = {
  is_authenticated: false,
  is_loading: false,
  is_session_active: false,
  user: "",
  id: 0,
  admin: false
};
export default function(state = initial_state, action) {
  console.log(action);
  const { type, payload } = action;
  if (type === "LOGIN_PENDING" || type === "LOGOUT_PENDING") {
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
        is_authenticated: true,
        user: data.login,
        id: data.id
      };
    }
  }
  if (type === "IS_ACTIVE") {
    const { id, user } = payload;
    console.log("is active", payload);
    if (id && user) {
      return {
        ...state,
        is_loading: false,
        is_authenticated: true,
        user: user,
        id: id
      };
    } else {
      return {
        ...state,
        is_loading: false,
        is_authenticated: false
      };
    }
  }
  if (type === "LOGOUT_FULFILLED") {
    localStorage.clear();
    sessionStorage.clear();
    return {
      ...state,
      is_loading: false,
      is_authenticated: false,
      is_session_active: false
    };
  }

  if (type === "CHECK_ROLE_FULFILLED") {
    const { role } = payload.data;
    return {
      ...state,
      admin: role === 666
    };
  }

  return state;
}
