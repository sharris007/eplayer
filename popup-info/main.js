import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { addLocaleData, IntlProvider } from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import itLocaleData from 'react-intl/locale-data/it';
import nlLocaleData from 'react-intl/locale-data/nl';
import frJson from './translations/fr.json';
import itJson from './translations/it.json';
import nlJson from './translations/nl.json';

import ComponentOwner from './src/js/Component-owner';

const translations = {
  'fr' : frJson,
  'it' : itJson,
  'nl' : nlJson
};

export default class PopUpInfoComponent extends React.Component {
  constructor(props) {
    super(props)
    addLocaleData(frLocaleData);
    addLocaleData(itLocaleData);
    addLocaleData(nlLocaleData);
    this.init(props);
  }

  componentDidMount() {
    
  }

  render() {
    return null
  }

  init=(config)=> {
    const locale = config.locale ? config.locale : 'en';
    ReactDOM.render(
      <IntlProvider locale={locale} messages={translations[locale]}>
        <ComponentOwner bookUrl = "https://content.stg-openclass.com/eps/pearson-reader/api/item/651da29d-c41d-415e-b8a4-3eafed0057db/1/file/LutgensAtm13-071415-MJ-DW/OPS/s9ml/chapter02/filep7000496728000000000000000000cae.xhtml" isFromComponent = {true} ParagraphNumeroUno = {config.ParagraphNumeroUno} />
      </IntlProvider>,
        document.getElementById(config.contentId)
    );
  };  
};
export CustomPopUp from './src/js/CustomPopUp';
export PopUpInfo from './src/js/PopUpInfo';
// Listen for client events to initialize a new PopUp Component
document.body.addEventListener('o.InitPopUpInfo', e => new PopUpInfoComponent(e.detail));
