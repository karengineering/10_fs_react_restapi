import React from 'react';
import { Link } from 'react-router-dom';

//stateless component
/*
Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) 
OR the user's name and a button for signing out (if there's an authenticated user).
*/
export default class Header extends React.PureComponent {

    render() {
        const {context} = this.props;
        const authUser  = context.authenticatedUser;

        //if a user is signed in, welcome them
        return (
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                    <nav>
                        {authUser ? (
                            <ul className="header--signedin">
                                <React.Fragment>
                                    <li>Welcome, {authUser.firstName} {authUser.lastName}!</li>
                                    <li><Link to="/signout">Sign Out</Link></li>
                                </React.Fragment>
                            </ul>
                        ) : (
                            <ul className="header--signedout">
                                <React.Fragment>
                                    <li><Link to="/signup">Sign Up</Link></li>
                                    <li><Link to="/signin">Sign In</Link></li>
                                </React.Fragment>
                            </ul>
                        )}
                    </nav>
                </div>
            </header>
        );
    }
};