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
  return titles[key].id === key ? titles[key].defaultMessage : key;
}
function getSearchFormat(response) {
  const searchResults = [];
  const titles = message;
  if (response.searchResults && response.searchResults.length > 0) {
    response.searchResults.forEach((result) => {
      let results = [];
      result.productsList.forEach((product) => {
        let obj = {
          content : product.matchedFields['term'] || product.matchedFields['chaptertitle'],
          id: product.source && product.source.url ? product.source.url.split("OPS")[1] : '' 
        };
        obj.content = obj.content.replace('[', '').replace(']', '');
        results.push(obj);
      });
      let searchObj = {
        category : result.key in titles ? searchTitle(titles, result.key) : result.key,
        results
      }
      searchResults.push(searchObj);
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
    payLoad.queryString = searchcontent;
    payLoad.responseSize = 6;
    payLoad.filter[0] += window.localStorage.getItem('searchIndexId');
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
  }
};

export default searchActions;
