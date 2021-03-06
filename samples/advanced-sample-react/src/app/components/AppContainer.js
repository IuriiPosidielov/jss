import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { commonContainer } from 'enhancers';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

import App from './App';

const mapStateToProps = (state) => ({
  loading: state.app.loading,
  rendering: state.app.route,
  lang: state.app.currentLang,
  sitecoreContext: state.app.context,
  metaTitle: state.app.route && state.app.route.fields && state.app.route.fields.metaTitle,
  routeFields: state.app.route && state.app.route.fields,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

/*
   AppContainer needs to utilize withRouter to ensure that route updates are note blocked by redux connect:
   https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(commonContainer(App)));
