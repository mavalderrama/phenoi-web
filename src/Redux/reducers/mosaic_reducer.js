let initial_state = {
  open_upload_shape_form: false,
  mosaic_opened: null,
  open_add_mosaic_form: false,
  is_loading: false
};

export default function(state = initial_state, action) {
  console.log("Drawer Actions", action);
  const { type, payload } = action;

  if (
    type === "UPLOAD_SHAPE_FILE_PENDING" ||
    type === "GET_FEATURES_PENDING" ||
    type === "PERFORM_TIMESERIES_PENDING" ||
    type === "CREATE_MOSAIC_PENDING"
  ) {
    return {
      ...state,
      is_loading: true
    };
  }

  if (type === "OPEN_UPLOAD_SHAPE_FORM") {
    console.log("UPLOAD SHAPE", payload);
    return {
      ...state,
      open_upload_shape_form: true,
      mosaic_opened: payload.mosaic_opened
    };
  }
  if (type === "CLOSE_UPLOAD_SHAPE_FORM") {
    return {
      ...state,
      open_upload_shape_form: false
    };
  }

  if (type === "UPLOAD_SHAPE_FILE_FULFILLED") {
    return {
      ...state,
      is_loading: false
    };
  }

  if (type === "GET_FEATURES_FULFILLED") {
    return {
      ...state,
      is_loading: false
    };
  }

  if (type === "PERFORM_TIMESERIES_FULFILLED") {
    return {
      ...state,
      is_loading: false
    };
  }

  if (type === "CREATE_MOSAIC_FULFILLED") {
    return {
      ...state,
      open_add_mosaic_form: false,
      is_loading: false
    };
  }

  if (type === "CLOSE_ADD_MOSAIC_FORM") {
    return {
      ...state,
      open_add_mosaic_form: false
    };
  }

  if (type === "OPEN_ADD_MOSAIC_FORM") {
    return {
      ...state,
      open_add_mosaic_form: true
    };
  }

  return state;
}
