import { COURSE, COURSES, CURRENT, LOGIN, LOGOUT } from "./types";

const rootReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case CURRENT:
      return { ...state, currentLesson: action.payload };
    case COURSES:
      return { ...state, courses: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
