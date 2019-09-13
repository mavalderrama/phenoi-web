let initial_state = {
  open_upload_shape_form: false
};

export default function(state = initial_state, action) {
  console.log("Drawer Actions", action);
  const { type, payload } = action;
  if (type === "OPEN_UPLOAD_SHAPE_FORM") {
    return {
      ...state,
      open_upload_shape_form: true
    };
  }
  if (type === "CLOSE_UPLOAD_SHAPE_FORM") {
    return {
      ...state,
      open_upload_shape_form: false
    };
  }
  return state;
}
