import { types } from './actionTypes';
import { DEFAULT_LANGUAGE } from './constants';

const initialState = {
  loading: false,
  browserSupported: true,
  currentLang: DEFAULT_LANGUAGE,
  currentRoute: '/',
  showLogin: false,
  loginFailed: true,
};

const createRouteChangeCompletedState = (state, action) => {
  const newState = {
    ...state,
    route: { path: action.payload.path, ...action.payload.data.sitecore.route },
    context: { ...action.payload.data.sitecore.context },
  };

  if (action.payload.currentLang) {
    newState.currentLang = action.payload.currentLang;
  }
  if (action.payload.currentRoute) {
    newState.currentRoute = action.payload.currentRoute;
  }
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_STARTED:
      return { ...state, loading: true };
    case types.INIT_COMPLETED:
      return { ...state, loading: false };
    case types.SUPPORTED_BROWSER_CHECK_COMPLETED:
      return { ...state, browserSupported: action.payload.supported };
    case types.ROUTE_CHANGE_COMPLETED:
      return createRouteChangeCompletedState(state, action);
    case types.LOGIN_FORM_VISIBILITY_TOGGLED:
      return {
        ...state,
        showLogin: action.payload.show,
        loginFailed: false,
      };
    case types.LOGIN_COMPLETE:
      return {
        ...state,
        showLogin: !action.payload.success,
        loginFailed: !action.payload.success,
      };
    default:
      return state;
  }
};

export default reducer;
