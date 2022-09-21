import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ReactHelmet from 'containers/ReactHelmet';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from 'reducers';
import App from 'routes';
import { store } from 'store/configureStore';
import 'styles/materialTable.css';
import { themer } from 'styles/theme';
import './index.css';

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
