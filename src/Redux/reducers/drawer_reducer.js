var initial_state = {
  open: true,
  is_loading: false,
  open_project: false,
  projects: [],
  mosaics: [],
  open_add_project_form: false,
  submit_add_project: false
};

export default function(state = initial_state, action) {
  console.log("Drawer Actions", action);
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
  if (
    type === "GET_PROJECTS_PENDING" ||
    type === "GET_MOSAICS_PENDING" ||
    type === "CREATE_PROJECT_PENDING"
  ) {
    return {
      ...state,
      is_loading: true
    };
  }
  if (type === "GET_PROJECTS_FULFILLED") {
    const { data } = payload;
    // console.log("payload", Object.keys(data.projects));
    return {
      ...state,
      is_loading: false,
      projects: data.projects
    };
  }
  if (type === "GET_MOSAICS_FULFILLED") {
    const { data } = payload;
    console.log(data);
    return {
      ...state,
      is_loading: false,
      mosaics: data.mosaics,
      open_project: true
    };
  }

  if (type === "CREATE_PROJECT_FULFILLED") {
    const { data } = payload;
    console.log(data);
    return {
      ...state,
      is_loading: false,
      open_add_project_form: false,
      submit_add_project: true
    };
  }

  if (type === "OPEN_ADD_PROJECT_FORM") {
    return {
      ...state,
      open_add_project_form: true
    };
  }

  if (type === "CLOSE_ADD_PROJECT_FORM") {
    return {
      ...state,
      open_add_project_form: false
    };
  }

  return state;
}
