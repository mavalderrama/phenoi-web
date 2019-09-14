let initial_state = {
  open_upload_shape_form: false,
  mosaic_opened: null,
  is_loading: false
};

export default function(state = initial_state, action) {
  console.log("Drawer Actions", action);
  const { type, payload } = action;

  if (type === "UPLOAD_SHAPE_FILE_PENDING") {
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

  if (type === "UPLOAD_SHAPE_FILE_FULFILLED") {
    return {
      ...state,
      is_loading: false
    };
  }



  return state;
}