import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SignIn = () => {

  const {signInUser} = use(AuthContext)

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    //firebase sign in send
    signInUser(email, password)
    .then(result => {
      console.log(result.user);

      const signInInfo = {
        email,
        lastSignInTime: result.user?.metadata?.lastSignInTime,
      }
 
      // update last sign in to the database
      fetch("http://localhost:3000/users", {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(signInInfo)
      })
      .then(res => res.json())
      .then(data => {
        console.log("after update patch", data);
      })
    })
    .catch(error => {
      console.log(error);
    })


  }

  return (
    <div>
      <form
        onSubmit={handleSignIn}
        className="fieldset bg-base-200 border-base-300 rounded-box w-sm mx-auto border p-4 my-16"
      >
        <legend className="fieldset-legend">sign in now!</legend>


        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Password"
        />

        <button className="btn btn-neutral mt-4">sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
