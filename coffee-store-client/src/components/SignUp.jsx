import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SignUp = () => {

    const {createUser} = use(AuthContext);
    console.log(createUser);

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const {email, password, ...userProfile} = Object.fromEntries(formData.entries());

        // const email = formData.get("email")
        // const password = formData.get("password")
        console.log(email, password, userProfile);

        // create user in the firebase
        createUser(email, password) 
        .then(result => {
            console.log(result.user);

            // save profile info in the db
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(userProfile)
            })
            .then(res => res.json())
            .then(data => {
                console.log("after profile save", data);

                if(data.insertedId) {
                    
                }
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

  return (
    <div>
      <form onSubmit={handleSignUp} className="fieldset bg-base-200 border-base-300 rounded-box w-sm mx-auto border p-4 my-16">
        <legend className="fieldset-legend">sign up now!</legend>
        
        <label className="label">Name</label>
        <input type="text" name="name" className="input" placeholder="Name" />

        <label className="label">Address</label>
        <input type="text" name="address" className="input" placeholder="Address" />

        <label className="label">Phone</label>
        <input type="text" name="phone" className="input" placeholder="Phone Number" />

        <label className="label">Photo URL</label>
        <input type="text" name="photo" className="input" placeholder="Photo URL" />

        <label className="label">Email</label>
        <input type="email" name="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" name="password" className="input" placeholder="Password" />

        <button className="btn btn-neutral mt-4">sign up</button>
      </form>
    </div>
  );
};

export default SignUp;
