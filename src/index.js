import React from 'react';
import ReactDOM from 'react-dom';
import ReactHelmet from 'containers/ReactHelmet';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { themer } from 'styles/theme';
import App from 'routes';
import './index.css';
import 'styles/materialTable.css';
import { store, history } from 'store/configureStore';
import rootReducer from 'reducers';
import { Provider } from 'react-redux';

document.getElementById('body').className = 'background-theme';

const theme = createTheme(themer);

const renderUI = (Component) => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
    <ReactHelmet>
       <Provider store={store}>
        <Component />
        </Provider>
    </ReactHelmet>
    </MuiThemeProvider>,
    document.getElementById('root')
  );
}

renderUI(App);

if(module.hot){
  module.hot.accept('routes',()=>{renderUI(App)});
  module.hot.accept('reducers',()=>store.replaceReducer(rootReducer))
}
