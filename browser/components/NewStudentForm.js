import React, { Component } from 'react';

class NewStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange() {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    event.preventDefault();

    this.props.addStudent(this.state).then(
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
      })
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          name="firstName"
          // value={this.state.firstName}
          onChange={this.onChange}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={this.onChange}
        />

        <label htmlFor="email">Email Address:</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
        />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default NewStudentForm;
