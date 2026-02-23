import React from "react";

const AddGadget = () => {
  const handleAddGadget = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newGadget = Object.fromEntries(formData.entries());
    console.log(newGadget);

    // send gadget data to the db
    fetch("http://localhost:5000/gadgets", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newGadget),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-10 mx-auto">
      <div className="w-full max-w-5xl bg-base-200 rounded-2xl shadow-lg p-8 md:p-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">Add Gadget</h1>
          <p className="text-sm md:text-base text-gray-500 mt-3">
            Add a new gadget to your inventory. Fill in all the required
            information including name, price, supplier and photo URL.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAddGadget} className="space-y-6">
          {/* Grid Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="form-control">
              <label className="label font-semibold">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Gadget Name"
              />
            </div>

            {/* Quantity */}
            <div className="form-control">
              <label className="label font-semibold">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="input input-bordered w-full"
                placeholder="Gadget Quantity"
              />
            </div>

            {/* Supplier */}
            <div className="form-control">
              <label className="label font-semibold">Supplier</label>
              <input
                type="text"
                name="supplier"
                className="input input-bordered w-full"
                placeholder="Gadget Supplier"
              />
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label font-semibold">Price</label>
              <input
                type="number"
                name="price"
                className="input input-bordered w-full"
                placeholder="Gadget Price"
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label font-semibold">Category</label>
              <input
                type="text"
                name="category"
                className="input input-bordered w-full"
                placeholder="Gadget Category"
              />
            </div>

            {/* Details */}
            <div className="form-control">
              <label className="label font-semibold">Details</label>
              <input
                type="text"
                name="details"
                className="input input-bordered w-full"
                placeholder="Short Details"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label font-semibold">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input input-bordered w-full"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary w-full mt-4 text-base">
            Add Gadget
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGadget;
