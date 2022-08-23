
import React from 'react';

export default ({ context  }) => {
  const authUser = context.authenticatedUser;
  return (
    <div>
      <h1>{authUser.firstName} {authUser.lastName} is authenticated!</h1>
      <p>Your emailAddress is {authUser.emailAddress}.</p>
    </div>
  );
}