export const initialState = {
  messages: [],
  input: "",
  loading: false,
};

export const chatReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_INPUT":
      return { ...state, input: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "RESET_INPUT":
      return { ...state, input: "" };
    default:
      return state;
  }
};
