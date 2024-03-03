// import class component
import { Component } from 'react';
import  { signUp } from '../../utilities/users-service';

// use extends key word to implement Component
export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      // from the evt object, goes through target, to match the name attribute
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  // SignUpForm.jsx <--> user-service.js <--> user-api.js <-Internet-> server.js (Express)

  handleSubmit = async (evt) => {
    evt.preventDefault(); // prevents form from being submitted
    try {
      // send our data to the server
      const {name, email, password} = this.state // destructuring this.state object to variables name, email, password to use in formData
      const formData = {name, email, password}; // create new object that contains name, email, password
      // The promise returned by the signUp service method will resolve to the user object included in the payload of the JSON Web Token (JWT)
      const user = await signUp(formData); // signUp will return a promise
      // console.log(user);
      this.props.setUser(user);
    } catch {
      // an error occurred
      // probably due to a duplicate email
      this.setState({ error: 'Sign Up Failed - Try Again'});
    }
  }

  // render method returns user interface as JSX (like a function)
  render() {
    // if password and confirm are same, disable is set to false, and button is available
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        {/* SignUpForm */}
        {/* this key is used to access the state above */}
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}