const HighlightText = (getProps) => {
	//Highlight Searched Text
	if (getProps.props.src.highlightText) {
      const reg = new RegExp(getProps.props.src.highlightText, 'g');
      getProps.bookContainerRef.innerHTML = getProps.bookContainerRef.innerHTML.replace(reg, '<span class="react-highlighted-text">'+getProps.props.src.highlightText+'</span>');
    }
    document.addEventListener('click', clearSearchHighlights);
}
const clearSearchHighlights = (e) => {
    if (!e.target.closest('.book-container')) {
      const span = getProps.bookContainerRef.getElementsByTagName('span');
      for (let i = 0; i < span.length; i++) {
        if ( span[i].className === 'react-highlighted-text') {
          span[i].className = '';
        }
      }
    }
  }
export default HighlightText;