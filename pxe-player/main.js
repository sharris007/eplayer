import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
// i18n, set up for French out-of-the-box
import {addLocaleData, IntlProvider} from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';

import ComponentOwner from './src/js/component-owner';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { LearningContextProvider } from '@pearson-incubator/vega-viewer';
import axios from 'axios';
//import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin();

export default class PxePlayerComponent {
  constructor(config) {
    addLocaleData(frLocaleData);
    this.init(config);
  }

  init=config=>{
    const pxeClient = axios.create({
      baseURL: config.pageDetails.baseUrl,
      timeout: 5000,
      headers: {}
    });
    const productData = { product: 'PXE', uuid: '' };
    const locale = config.pageDetails.locale ? config.pageDetails.locale : 'en';
    const App = () => (
      <LearningContextProvider
        contextId="ddddd"
        contentType={productData.product.toUpperCase()}
        componentFactory={{ getComponent: function getComponent(pageData) { console.log('Unhandled component!', pageData); return null; } }}
        clients={{page:pxeClient}}
        metadata={{ environment: 'LOCAL' }}
      >
        <IntlProvider locale={locale}>
          <MuiThemeProvider>
            <ComponentOwner bootstrapParams={config} applnCallback={config.applnCallback} />
          </MuiThemeProvider>
        </IntlProvider>
      </LearningContextProvider>
     );
    ReactDOM.render(
       <App/>, document.getElementById(config.pageDetails.elementId)
    );
  };  
};

export PxePlayer from './src/js/PxePlayer';
// Listen for client events to initialize a new PxePlayer component
document.body.addEventListener('o.InitPxePlayer', e => new PxePlayerComponent(e.detail));
