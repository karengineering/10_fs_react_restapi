import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/*
Stateful component

-renders a form that allows a user to sign up by creating a new account
-also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user
-also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses)
*/
export default class UserSignUp extends Component {

    //new user signs up w/ full name, email, and password
    //validation is added and displayed to make sure no info is missing

    state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      errors: [],
    }

    render() {
        const {
          firstName,
          lastName,
          emailAddress,
          password,
          errors,
    } = this.state;

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign Up"
                    elements={() => (
                        <React.Fragment>
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                id="firstName" 
                                name="firstName" 
                                type="text"
                                value={firstName} 
                                onChange={this.change} 
                            />
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                id="lastName" 
                                name="lastName" 
                                type="text"
                                value={lastName} 
                                onChange={this.change} 
                            />
                            <label htmlFor="emailAddress">Email Address</label>
                            <input 
                                id="emailAddress" 
                                name="emailAddress"
                                type="email"
                                value={emailAddress} 
                                onChange={this.change} 
                            />
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password" 
                                name="password"
                                type="password"
                                value={password} 
                                onChange={this.change} 
                            />
                        </React.Fragment>
                    )} />
                <p>
                    Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                </p>
            </div>
        </main>
      );
    }
// }

change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state;

    // Create user
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    context.data.createUser(user)
    .then( errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        context.actions.signIn(emailAddress, password)
          .then(() => {
            this.props.history.push('/');    
          });
      }
    })
    .catch((err) => {
      console.log(err);
      this.props.history.push('/error');
    });

}

// returns the user to the default route
cancel = () => {
 this.props.history.push('/');
}
}