import React,{useState,useEffect} from 'react';
import { Router, Switch, Route } from "react-router-dom";
import DashboardOverview from '../dashboard/DashboardOverview';
import { Routes } from '../../routes';
import axios from 'axios';
import { useContext, } from "react";
import './loginpagecss.scss';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
//import {Context} from './context';
import UserCreds from '../../data/UserCreds';
import { faCreativeCommonsNd, faCreativeCommonsPdAlt } from '@fortawesome/free-brands-svg-icons';
import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";


class Login extends React.Component {
  nextPath(path) {
    this.props.history.push(path);
  }

  constructor(props) {
    super(props);
    this.state = {
      currentView: "logIn",
      username:'',
      email:'',
      password:''
    };


   
    
    this.handleLogin=this.handleLogin.bind(this);
    
    this.handleChange =this.handleChange.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
}
async handleLogin(event){

  const UserObject = {
    username: this.state.username,
    password: this.state.password
  };
 

const loginSuccess = await this.axiosPost(UserObject);

console .log (loginSuccess)



UserCreds.username= loginSuccess.username;
UserCreds.email= loginSuccess.email;
UserCreds.password =loginSuccess.password;
console.log(UserCreds)
 if(loginSuccess.email != null){
  // console.log(data);
  axios.get()
  this.nextPath('/dashboard/overview')
 }
}

async axiosPost(UserObject) {
  const responsetype = await axios.post('http://localhost:5000/api/users/login', UserObject)
  return responsetype.data
}





handleChange(event) {
  let target = event.target;
  let value = target.type === "checkbox" ? target.checked : target.value;
  let name = target.name;
    this.setState({
      [name]: value
    }); 
    //console.log(this.state)
}

 handleSubmit(e) {
  e.preventDefault();
  console.log("hello")
  
  const UserObject = {
    username: this.state.username,
    email: this.state.email,
    password: this.state.password
  };
  
//     fetch("http://localhost:5000/api/users/createUser", {
//    method: 'POST',
//    headers: {
//       'Content-Type': 'application/json',
//    },
//    body: JSON.stringify(UserObject)
// })
axios.post('http://localhost:5000/api/users/createUser', UserObject)
.then(res => console.log(res.data));

console.log("The form was submitted with the following data:");
console.log(UserObject);


UserCreds.username= UserObject.username;
UserCreds.email= UserObject.email;
UserCreds.password =UserObject.password;
console.log(UserCreds)
this.createdfunction()
setTimeout(() => { this.nextPath('/dashboard/overview') }, 100)
// console.log(char)
// if (char ===40){
// }

}
   

createdfunction(){
  return(
    <div><h>createdpage</h>
  
    </div>
  )
}



    changeView = (view) => {
      this.setState({
        currentView: view
      })
    } 

    onSubmit(e){
      e.preventDefault();
      console.log("this is submit function for the data login page")
    }
    
  
    
    currentView = () => {
     
      switch(this.state.currentView) {
        case "signUp":
          return (
          
            <form onSubmit={this.handleSubmit}>
              <h2>Sign Up!</h2>
              <fieldset>
                <legend>Create Account</legend>
                <ul>
                  <li>
                    <label for="username">Username:</label>
                    <input type="text" id ="username" required  name="username"  onChange={this.handleChange}  />
                  </li>
                  <li>
                    <label for="email">Email:</label>
                    <input type="email" id="email" required name="email"   placeholder="Enter your email..."   
                    onChange={this.handleChange}
                    />
                  </li>
                  <li>
                    <label for="password">Password:</label>
                    <input type="password" id="password" required    name ="password" placeholder="Enter your password..."  
                    onChange={this.handleChange}
                  />
                  </li>
                </ul>
              </fieldset>
              <button type="button" onClick ={this.handleSubmit} >Submit</button>
              <button type="button" onClick={ () => this.changeView("logIn")}>Have an Account?</button>
            
            </form>
          )
          break
        case "logIn":
          return (
            <form onSubmit={this.handleLogin}>
              <h2>Welcome Back!</h2>
              <fieldset>
                <legend>Log In</legend>
                <ul>
                  <li>
                    <label for="username">Username:</label>
                    <input type="text" id="username" required name="username"  placeholder="Enter your username..."
                    onChange={this.handleChange}  />
                  </li>
                  <li>
                    <label for="password">Password:</label>
                    <input type="password" id="password" required  name="password" placeholder="Enter your password..."
                    onChange={this.handleChange}  />
                  </li>
                  <li>
                    <i/>
                    <a onClick={ () => this.changeView("PWReset")} href="#">Forgot Password?</a>
                  </li>
                </ul>
              </fieldset>
              <button type="button"  onClick={this.handleLogin} >Login</button>
              <button type="button" onClick={ () => this.changeView("signUp")}>Create an Account</button>
            </form>
          )
          break
        case "PWReset":
          return (
            <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" required/>
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={ () => this.changeView("logIn")}>Go Back</button>
          </form>
          )
        default:
          break
      }
    }
  
    render() {
       return (
        <section id="entry-page">
          {this.currentView()}
        </section>
      )
    }
  }
export default Login;