const initialState = {
  questionoption: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_OPTION":
      // console.log(action.payload);
      state.questionoption[action.payload[0]] = action.payload[1];
      return { questionoption: state.questionoption };

    case "EDIT_OPTION":
      // console.log("Edit DAta", action.payload);
      state.questionoption[action.payload[0]] = action.payload[1];
      return { questionoption: state.questionoption };

    case "CLEAR_DATA":
      state.questionoption = {};
      return { questionoption: state.questionoption };
    default:
      return state;
  }
};

export default rootReducer;
