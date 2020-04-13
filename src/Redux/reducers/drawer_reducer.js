let initial_state = {
  open: false,
  is_loading: false,
  open_project: false,
  projects: [],
  project_opened: "",
  mosaics: [],
  mosaic_opened: "",
  open_add_project_form: false,
  submit_add_project: false,
  open_add_shapefile: false,
  bread: [],
  admin_console: true,
  admin_console_tab: 0,
  roles_available: [],
  companies_available: []
};

export default function(state = initial_state, action) {
  console.log("Drawer Actions", action);
  const { type, payload } = action;
  if (type === "REFRESH_TO_PROJECTS") {
    return {
      ...state,
      open: true,
      is_loading: false,
      open_project: false,
      projects: [],
      project_opened: "",
      mosaics: [],
      mosaic_opened: "",
      open_add_project_form: false,
      submit_add_project: false,
      is_admin: false,
      admin_console: false
    };
  }
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
    console.log("get mosaics ffld", action);
    return {
      ...state,
      is_loading: false,
      mosaics: data.mosaics,
      open_project: true,
      project_opened: data.project_name
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

  if (type === "OPEN_SELECTED_MOSAIC") {
    const { data } = payload;
    console.log(data);
    return {
      ...state
    };
  }

  if (type === "OPEN_FORM_ADD_SHAPEFILE") {
    return {
      ...state,
      open_add_shapefile: true
    };
  }

  if (type === "CLOSE_FORM_ADD_SHAPEFILE") {
    return {
      ...state,
      open_add_shapefile: false
    };
  }

  if (type === "PUSH_BREAD") {
    var act_bread = state.bread;
    // act_bread.push(payload);
    return {
      ...state,
      bread: payload
    };
  }

  if (type === "POP_BREAD") {
    let act_bread = state.bread;
    act_bread.pop();
    return {
      ...state,
      bread: act_bread
    };
  }

  if (type === "OPEN_ADMIN_CONSOLE") {
    return {
      ...state,
      admin_console: true
    };
  }

  if (type === "CLOSE_ADMIN_CONSOLE") {
    return {
      ...state,
      admin_console: false
    };
  }

  if (type === "CHANGE_TAB") {
    return {
      ...state,
      admin_console_tab: payload
    };
  }

  if (type === "FETCH_ROLES_FULFILLED") {
    const { data } = payload;
    console.log("FETCH_ROLES_FULFILLED", data);
    return {
      ...state,
      roles_available: data.roles
    };
  }

  if (type === "FETCH_COMPANIES_FULFILLED") {
    const { data } = payload;
    console.log("FETCH_ROLES_FULFILLED", data);
    return {
      ...state,
      companies_available: data.company
    };
  }

  return state;
}
