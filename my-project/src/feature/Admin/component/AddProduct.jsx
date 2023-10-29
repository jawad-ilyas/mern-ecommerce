/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { addProductAsync, allBrands, fetchProductByIdAsync, selectCatageroy, selectProduct, updateProductAsync } from '../../ProductList/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
export default function AddProduct() {


    const brands = useSelector(allBrands)
    const catageroy = useSelector(selectCatageroy)

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm()


    const { id } = useParams();
    if (id) {
        console.log(id);
    }

    useEffect(() => {
        if (id)
            dispatch(fetchProductByIdAsync(id))
    }, [dispatch, id])


    const product = useSelector(selectProduct);
    console.log(product)


    useEffect(() => {
        if (id) {
            setValue("title", product.title);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("discountPercentage", product.discountPercentage);
            setValue("rating", product.rating);
            setValue("stock", product.stock);
            setValue("brand", product.brand);
            setValue("category", product.category);
            setValue("thumbnail", product.thumbnail);
            setValue("images1", product.images[0]);
            setValue("images2", product.images[1]);
            setValue("images3", product.images[2]);
            setValue("images4", product.images[3]);
            setValue("images4", product.images[3]);

        }
    }, [product, setValue])





    const onSubmit = (data) => {

        const productEdit = { ...data }
        console.log(productEdit)

       
        productEdit.images = [productEdit.images1, productEdit.images2, productEdit.images3, productEdit.images4]
        delete (productEdit.images1);
        delete (productEdit.images2);
        delete (productEdit.images3);
        delete (productEdit.images4);
        console.log(productEdit)
        if(id)
        {
            productEdit.id = +id;
            dispatch(updateProductAsync(productEdit));
        }
        else
        {

            
            dispatch(addProductAsync(productEdit));

        }

        console.log(data) 
       
        reset();
    }
    const handleCancelClick = () => {
        reset(); // Reset the form
    }



    return (
        <div className='container md:max-w-screen-lg mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Add Information to create a product
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                            <div className="col-span-full">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register("title", { required: true })}
                                        id="price"
                                        autoComplete="price"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        {...register("description", { required: true })}
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the product.</p>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register("price", { required: true })}
                                        step="any"
                                        id="price"
                                        autoComplete="price"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                    Discount Percentage
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register("discountPercentage", { required: true })}
                                        step="any"
                                        id="discountPercentage"
                                        autoComplete="discountPercentage"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rating
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register("rating", { required: true })}
                                        id="rating"
                                        step="any"
                                        autoComplete="rating"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register("stock", { required: true })}
                                        step="any"
                                        id="stock"
                                        autoComplete="stock"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <select
                                        type="text"
                                        {...register("brand", { required: true })}
                                        id="brand"
                                        autoComplete="brand"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        {brands.map((item) => ( // Use parentheses to return JSX elements
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <select
                                        type="text"
                                        {...register("category", { required: true })}
                                        id="catageroy"
                                        autoComplete="brand"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        {catageroy.map((item) => ( // Use parentheses to return JSX elements
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                    Thumbnail
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register("thumbnail", { required: true })}
                                        id="thumbnail"
                                        autoComplete="thumbnail"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="images1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Images1
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register("images1", { required: true })}
                                        id="images1"
                                        autoComplete="images1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="images2" className="block text-sm font-medium leading-6 text-gray-900">
                                    Images2
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register("images2", { required: true })}
                                        id="images2"
                                        autoComplete="images2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="images3" className="block text-sm font-medium leading-6 text-gray-900">
                                    Images3
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register("images3", { required: true })}
                                        id="images3"
                                        autoComplete="images3"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="images4" className="block text-sm font-medium leading-6 text-gray-900">
                                    Images4
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register("images4", { required: true })}
                                        id="images4"
                                        autoComplete="images4"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            {/*                             
                            <div className="col-span-full">
                                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                                    Quantity
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        autoComplete="quantity"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleCancelClick} // Call the function on Cancel button click
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>


        </div>
    )
}
