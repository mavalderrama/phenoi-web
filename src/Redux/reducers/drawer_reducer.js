var initial_state = {
  open: true,
  is_loading: false,
  expand_projects: false,
  projects: []
};

export default function(state = initial_state, action) {
  // console.log("Drawer Actions", action);
  const { type, payload } = action;
  if (type === "OPEN") {
    return {
      ...state,
      open: true
    };
  }
  if (type === "CLOSE") {
    return {
      ...state,
      open: false
    };
  }
  if (type === "GET_PROJECTS_PENDING") {
    return {
      ...state,
      is_loading: true
    };
  } else if (type === "GET_PROJECTS_FULFILLED") {
    const { data } = payload;
    // console.log("payload", Object.keys(data.projects));
    return {
      ...state,
      is_loading: false,
      projects: data.projects
    };
  }
  if (type === "EXPAND_PROJECTS") {
    return {
      ...state,
      expand_projects: true
    };
  } else if (type === "CLOSE_PROJECTS") {
    return {
      ...state,
      expand_projects: false
    };
  }

  return state;
}
