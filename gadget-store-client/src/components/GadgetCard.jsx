import React from "react";
import { Link } from "react-router";

const GadgetCard = ({ gadget, gadgets, setGadgets }) => {
  const { _id, name, quantity, price, photo } = gadget;

  const handledelete = (_id) => {
    fetch(`http://localhost:3000/coffees/${_id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      //remove gadget from state
      const remainingGadgets = gadgets.filter(gad => gad._id !== _id);
      setGadgets(remainingGadgets)
    })
  }

  return (
    <div className="card card-side bg-base-100 shadow-sm border">
      <figure>
        <img src={photo} alt="Movie" />
      </figure>
      <div className="flex justify-around w-full mt-8 ">
        <div>
          <h2 className="">{name}</h2>
          <p>Price: {price}</p>
          <p>Quantity: {quantity}</p>
        </div>
        <div className="card-actions justify-end">
          <div className="join join-vertical space-y-2">
            <Link to={`/gadget/${_id}`}>
              <button className="btn join-item">View Details</button>
            </Link>

            <Link to={`/updateGadget/${_id}`}>
              <button className="btn join-item">Edit</button>
            </Link>
            <button onClick={() => handledelete(_id)} className="btn join-item">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GadgetCard;
