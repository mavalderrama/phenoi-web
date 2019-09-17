let initial_state = {
  mosaic_id: null,
  is_loading: false,
  raster: null
};

export default function(state = initial_state, action) {
  console.log("editor reducer", action);
  const { type, payload } = action;
  if (type === "CALIBRATE_MOSAIC_PENDING" || type === "GET_MOSAIC_PENDING") {
    return {
      ...state,
      is_loading: true
    };
  }
  if (type === "CALIBRATE_MOSAIC_FULFILLED") {
    return {
      ...state,
      is_loading: false
    };
  }

  if (type === "GET_MOSAIC_FULFILLED") {
    console.log("response get mosaic", payload);
    return {
      ...state,
      is_loading: false,
      raster: payload.data.raster
    };
  }
  return state;
}
