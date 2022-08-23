
/*
stateless component

signs out the authenticated user and redirects the user to the default route (i.e. the list of courses)
*/

import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function UserSignOut ({context}) {
    useEffect(() => {
        context.actions.signOut();
    });

    return (
        <Redirect to="/" />
    );
}

export default UserSignOut;