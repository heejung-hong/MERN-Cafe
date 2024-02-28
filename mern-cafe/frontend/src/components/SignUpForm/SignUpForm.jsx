// import class component
import { Component } from 'react';

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

  handleSubmit = async (evt) => {
    evt.preventDefault(); // prevents form from being submitted
    alert(JSON.stringify(this.state));
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