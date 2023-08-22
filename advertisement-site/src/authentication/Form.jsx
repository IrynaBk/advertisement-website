import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import ErrorHandler from '../shared/ErrorHandler';
import AxiosClient from '../AxiosClient';

const errorToString = (errorObj) => {
  return Object.entries(errorObj)
      .map(([key, value]) => `${key}: ${value.join(", ")}`)
      .join("; ");
};

class Form extends React.Component {
 
    state = {
        username: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name:'',
        email:'',
        image: null,
        error: null
      }

    login = (username, password) => {
      AxiosClient.post("/login", {
    username: username,
    password: password
  })
  .then(response => {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", response.data.user);
    this.props.navigation("/advertisements");
  })
  .catch(error => {
    this.state.error = error;
  });
    }

    
    

      onImageChange = event => { 
        console.log(event.target.files[0])
        const file = event.target.files[0];
        this.setState({
          image: file
        })
      };

      handleChange = (event) => {
        event.persist();
        this.setState({ [event.target.name]: event.target.value });
      }

    onSubmit = (e) => {
        e.preventDefault()
        const form = new FormData()
        if (this.state.image){
          form.append("image", this.state.image)
        }
        form.append("email", this.state.email)
        form.append("username", this.state.username)
        form.append("first_name", this.state.first_name)
        form.append("last_name", this.state.last_name)
        form.append("password", this.state.password)
        form.append("password_confirmation", this.state.password_confirmation)
        fetch('http://localhost:3000/users', {
          method: "POST",
          body: form
        })
        .then(response => {
          if (!response.ok) {
            return response.json().then(data => {
              throw data;
            });
          }
          return response.json();
        })
        .then(data => {
          this.login(this.state.username, this.state.password);
        })
        .catch(error => {
          this.setState({ error: errorToString(error) });
        });
    }
    render(){
        return (
          <>
          {this.state.error && <ErrorHandler error={this.state.error} />}
            <form className="auth-form login-form" onSubmit={this.onSubmit}>
        <input type="file" accept="image/*" multiple={false} onChange={this.onImageChange} />
      
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter username" 
                   onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" name="first_name" placeholder="Enter first name" onChange={this.handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" name="last_name" placeholder="Enter last name" onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter email" onChange={this.handleChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter password" onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input type="password" id="passwordConfirmation" name="password_confirmation" placeholder="Enter password again" onChange={this.handleChange} />
          </div>

          <button type="submit" className="btn btn-primary"  >Sign Up</button>
          <p className="signup-link">Already have an account? <Link to={`/login`}>
          Login
            </Link></p>
        </form>
        </>
        )
    }
}
export default Form;