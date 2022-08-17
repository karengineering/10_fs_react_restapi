import React from 'react';
import { Link } from 'react-router-dom';

//stateless component
export default class Header extends React.PureComponent {

    render() {
        const {context} = this.props;
        const authUser = context.authenticatedUser;

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