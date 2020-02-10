  export default {
    // API_URI: "http://127.0.0.1:5000"
    // API_URI: "http://172.19.128.1"
    API_URI: process.env.NODE_ENV === 'development' ?  "http://127.0.0.1:5000" : "/api"
  };
