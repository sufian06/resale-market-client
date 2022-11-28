import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageHostKey = 'b3b4f407505052e8448a6474b1b88502';
  const navigate = useNavigate();

  const {data: categories, isLoading} = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/productCategory')
      const data = res.json();
      return data;
    }
  })

  const handleAddProduct = data => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(imgData => {
      if(imgData.success){
        const addedProduct = {
          name: data.name,
          price: data.price,
          condition: data.condition,
          phone: data.phone,
          location: data.location,
          category: data.category,
          year: data.year,
          image: imgData.data.url,
          description: data.description,
        }
        // save addedproduct information to the database
        fetch('http://localhost:5000/addedproducts', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(addedProduct)
        })
        .then(res => res.json())
        .then(result => {
          console.log(result)
          toast.success(`${data.name} is added successfully`);
          navigate("/dashboard/seller")
        })

      }
    })
  }

  if(isLoading){
    return <Loading />
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">Add a New Product</h2>
      <div className="max-w-xl p-7 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "name is required",
              })}
              className="input input-bordered w-full max-w-lg"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              {...register("price", {
                required: "price is required",
              })}
              className="input input-bordered w-full max-w-lg"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Condition</span>
            </label>
            <select
              {...register("condition", { required: "condition is required" })}
              className="input input-bordered w-full max-w-lg"
            >
              <option value="">Select Condition</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
            {errors.condition && (
              <p className="text-red-500">{errors.condition.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              type="text"
              {...register("phone", {
                required: "mobile number is required",
              })}
              className="input input-bordered w-full max-w-lg"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <select
              {...register("location", { required: "location is required" })}
              className="input input-bordered w-full max-w-lg"
            >
              <option value="">Select Location</option>
              <option value="dhaka">Dhaka</option>
              <option value="chittagong">Chittagong</option>
              <option value="rajshahi">Rajshahi</option>
              <option value="khulna">Khulna</option>
            </select>
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              {...register("category")}
              className="select select-bordered w-full max-w-xs"
            >
              {categories.map((cate) => (
                <option key={cate._id} value={cate.category}>
                  {cate.category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Year of Purchase</span>
            </label>
            <input
              type="text"
              {...register("year", {
                required: "year is required",
              })}
              className="input input-bordered w-full max-w-lg"
            />
            {errors.year && (
              <p className="text-red-500">{errors.year.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: "photo is required",
              })}
              className="input input-bordered w-full max-w-lg"
            />
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>

          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              type="text"
              {...register("description", {
                required: "description is required",
              })}
              className="input input-bordered w-full max-w-lg"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <input
            className="btn btn-primary text-white w-full mt-4"
            value="Add Product"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;