export const LoginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        isNewUser: false,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: true,
        isNewUser: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        isNewUser: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        isNewUser: false,
        error: false,
      };
    default:
      return { ...state };
  }
};

export const RegisterReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_START":
      return {
        user: null,
        isFetching: true,
        isNewUser: true,
        error: false,
      };
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        isFetching: true,
        isNewUser: true,
        error: false,
      };
    case "REGISTER_FAILURE":
      return {
        user: null,
        isFetching: false,
        isNewUser: false,
        error: true,
      };
    default:
      return { ...state };
  }
};