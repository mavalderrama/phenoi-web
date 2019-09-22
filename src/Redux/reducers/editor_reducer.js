let initial_state = {
  mosaic_id: null,
  is_loading: false,
  raster: [],
  vis: [],
  names: []
};

export default function(state = initial_state, action) {
  console.log("editor reducer", action);
  const { type, payload } = action;
  if (
    type === "CALIBRATE_MOSAIC_PENDING" ||
    type === "GET_MOSAIC_PENDING" ||
    type === "GET_FEATURES_PENDING"
  ) {
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
      raster: payload.data.raster,
      vis: payload.data.vis,
      names: payload.data.names
    };
  }

  if (type === "LOADING") {
    console.log(payload, "loading");
    if (payload) {
      return {
        ...state,
        is_loading: true
      };
    } else {
      return {
        ...state,
        is_loading: false
      };
    }
  }

  if (type === "GET_FEATURES_FULFILLED") {
    return {
      ...state,
      is_loading: false
    };
  }

  return state;
}
