import { resources, domain, typeConstants } from '../../../../const/Settings';

let searchUrl = resources.links.etextSearchUrl[domain.getEnvType()];
const searchFilters = {
  indexType: 'nextcontent',
  fieldsToReturn: ['chaptertitle', 'pagetitle', 'learningobjectives', 'content', 'type', 'glossary', 'figure'],
  fields: ['chaptertitle', 'glossary.word', 'glossary.text', 'learningobjectives.authoredtext', 'pagetitle'],
  highlightFields: ['chaptertitle', 'glossary.word', 'glossary.text', 'pagetitle', 'learningobjectives.authoredtext', 'content', 'figure.title']
};

const searchActions = {

  search(searchcontent, handleResults) {
    /*searchFilters.filter = [window.localStorage.getItem('indexid')];
    searchFilters.queryString = searchcontent;
    searchFilters.responseSize = 100;
    return {
      type: 'SEARCH',
      payload: clients.search.post('/search', searchFilters)
      .then(response => handleResults(getSearchFormat(response.data.searchResults)))
      .catch(error => error.response)
    };*/
  },
  autoComplete(searchcontent, handleResults) {
    searchFilters.filter = [window.localStorage.getItem('searchIndexId')];
    searchFilters.queryString = searchcontent;
    searchFilters.responseSize = 6;
    console.log(resources.links.etextSearchUrl[domain.getEnvType()]);
    fetch(resources.links.etextSearchUrl[domain.getEnvType()], 
      {
        method: 'POST',
        headers: {
          'application-id': 'ereader',
          'Content-Type': 'application/json',
          'X-Authorization': localStorage.getItem('secureToken')
        }
      }).then(response => response.json())
     .then((response) => {
       handleResults(response)
     })
    /*return {
      type: 'SEARCH',
      payload: clients.search.post('/autoComplete', searchFilters)
      .then(response => handleResults(getSearchFormat(response.data.searchResults)))
      .catch(error => error.response)
    };*/
  }
};

export default searchActions;
