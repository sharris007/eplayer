import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import LoginHeader  from '../../../components/LoginHeader';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.css';
import reducer from '../modules/loginReducer';


class LoginPage extends React.Component{
    constructor(props) {
    super(props);
    this.state = {loginname: '',
     password: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleChange(event) {
    this.setState({[event.target.name]: event.target.value});

   }
  
 
  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    //alert('A password was submitted: ' + this.input.value);
    event.preventDefault();
    console.log(this.state.loginname +" "+this.state.password);
    this.props.fetch(this.state.loginname, this.state.password)
    .then(() => {
    let {data} = this.props.data;
    data.password = this.state.password;
    console.log(data);
    this.props.storeLoginDetails(data);
    const LoginToken = [];
    const loginPiToken = [];

      if (this.props.fetched){
        LoginToken.push(this.props.data.token);
        loginPiToken.push(this.props.data.piToken);
        browserHistory.push(`/eplayer/bookshelf`);
          }
      })
  }
  componentWillMount() { 

  }
  componentDidMount() {};
  
     render() {
      /*let {data} = this.props.data;
      const LoginToken = [];
      //console.log('inside login page render :: '+ JSON.stringify(data));
      if (this.props.fetched && (this.props.data.code==200)) {
          //alert("hh"); 
          console.log(this.props.data);
          LoginToken.push(this.props.data.data.token);
          //this.props.storeLoginToken(LoginToken);
          browserHistory.push(`/bookshelf?authservice=sso&key=${LoginToken}`);
        }else{
          //alert("Wrong");
        }*/
       return (<div className="login-wrapper">
        <LoginHeader/>
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" name='loginname' className='form-control' value={this.state.value} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name='password' className='form-control'  onChange={this.handleChange}  required />
            </div>
            <button type="submit"  className="btn btn-primary">Sign In</button>
          </form>
        </div>
        </div>);
     }
}
LoginPage.propTypes = {
 // loginState: React.PropTypes.object,
 // fetching: React.PropTypes.object, 
 // fetched: React.PropTypes.object, 
 // error: React.PropTypes.object,
 // data:React.PropTypes.object
 //storeLoginToken:React.PropTypes.func 
}
export default LoginPage