
import React from 'react';

export default ({ context  }) => {
  const authUser = context.authenticatedUser;
  return (
    <div>
    {/* <div className="grid-100"> */}
      <h1>{authUser.firstName} {authUser.lastName} is authenticated!</h1>
      <p>Your emailAddress is {authUser.emailAddress}.</p>
    </div>
//   </div>
  );
}