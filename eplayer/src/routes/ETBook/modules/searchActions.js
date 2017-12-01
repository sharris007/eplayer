import { resources, domain, typeConstants } from '../../../../const/Settings';
import message from '../../../defaultMessages';

const searchFilters = {
  indexType: 'nextcontent',
  fieldsToReturn: ['chaptertitle', 'pagetitle', 'learningobjectives', 'content', 'type', 'glossary', 'figure'],
  fields: ['chaptertitle', 'glossary.word', 'glossary.text', 'learningobjectives.authoredtext', 'pagetitle'],
  highlightFields: ['chaptertitle', 'glossary.word', 'glossary.text', 'pagetitle', 'learningobjectives.authoredtext', 'content', 'figure.title']
};

const payLoad = { 
  "queryString":"",
  "indexType":"nextcontent",
  "filter":["indexid:"], 
  "responseSize":50,
  "searchOnMultipleIndexes":"true",
  "searchType":"FACET",
  "groupBy":["_index"]
};

function keyIndex(arr, key) {
  return arr.findIndex(item => (key === item.category));
}
function searchTitle(titles, key) {
  return titles[key.toLocaleLowerCase()].id === key ? titles[key.toLocaleLowerCase()].defaultMessage : key;
}
function getSearchFormat(response) {
  const searchResults = [];
  if (response) {
    response.forEach((result) => {
      searchFilters.fields.forEach((key) => {
        const titles = message;
        if (key in result.matchedFields) {
          let obj = {};
          const title = key in titles ? searchTitle(titles, key) : key;
          const categoryIndex = keyIndex(searchResults, title);
          if (categoryIndex < 0) {
            obj.category = title;
            obj.results = [{ id: result.id, content: result.matchedFields[key].replace('[', '').replace(']', '') }];
            searchResults.push(obj);
          } else {
            obj = searchResults[categoryIndex];
            obj.results.push({ id: result.id, content: result.matchedFields[key].replace('[', '').replace(']', '') });
          }
        }
      });
    });
    return searchResults;
  }
  return searchResults;
}

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
    /*searchFilters.filter = [window.localStorage.getItem('searchIndexId')];
    searchFilters.queryString = searchcontent;
    searchFilters.responseSize = 6;*/
    payLoad.queryString = searchcontent;
    payLoad.filter[0] += window.localStorage.getItem('searchIndexId');
    console.log(resources.links.etextSearchUrl[domain.getEnvType()]);
    fetch(resources.links.etextSearchUrl[domain.getEnvType()], 
      {
        method: 'POST',
        headers: {
          'application-id': 'ereader',
          'Content-Type': 'application/json',
          'X-Authorization': localStorage.getItem('secureToken')
        },
        body: JSON.stringify(payLoad)
      }).then(response => response.json())
     .then((response) => {
       handleResults((getSearchFormat(response)));
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
