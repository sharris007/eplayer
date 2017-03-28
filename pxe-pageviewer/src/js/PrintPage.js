const printPage = () => {
	
	window.open('http://localhost:4040/src/html/print.html','printpage');
}
export default printPage;


// import '../scss/pageviewer.scss';
// import React, { PropTypes } from 'react';
// import ReactDOM from 'react-dom';
// class PrintPage extends React.Component {
  
//   constructor(props) {
//     super(props);
//     this.startTimer=new Date();
//     this.intPrint();
//   };

//   intPrint = () => {
//   	window.open('','printwindow');
//   }
//   render(){
//   	return(
//   		<div>
//   		<button type="button" onClick="window.print()">Print</button>
//   		</div>
//   	)
//   }
// }
// export default PrintPage;