import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const BookCreationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // Append form fields
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    // Append images
    formData.append('mainImage', mainImage);
    subImages.forEach((image, index) => {
      formData.append(`subImages`, image);
    });

    try {
      const response = await axios.post('https://bookbazzar-backend.onrender.com/api/v1/book/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Assuming you store the token in localStorage
        }
      });
      console.log('Book created:', response.data);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error creating book:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Book</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input {...register('title', { required: 'Title is required' })} className="w-full p-2 border rounded" />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Author</label>
        <input {...register('author', { required: 'Author is required' })} className="w-full p-2 border rounded" />
        {errors.author && <span className="text-red-500">{errors.author.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Genre</label>
        <input {...register('genre', { required: 'Genre is required' })} className="w-full p-2 border rounded" />
        {errors.genre && <span className="text-red-500">{errors.genre.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea {...register('description', { required: 'Description is required' })} className="w-full p-2 border rounded" />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Condition</label>
        <input {...register('condition', { required: 'Condition is required' })} className="w-full p-2 border rounded" />
        {errors.condition && <span className="text-red-500">{errors.condition.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Language</label>
        <input {...register('language', { required: 'Language is required' })} className="w-full p-2 border rounded" />
        {errors.language && <span className="text-red-500">{errors.language.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Price</label>
        <input type="number" {...register('price', { required: 'Price is required' })} className="w-full p-2 border rounded" />
        {errors.price && <span className="text-red-500">{errors.price.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Stock</label>
        <input type="number" {...register('stock', { required: 'Stock is required' })} className="w-full p-2 border rounded" />
        {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Published Date</label>
        <input type="date" {...register('publishedDate', { required: 'Published Date is required' })} className="w-full p-2 border rounded" />
        {errors.publishedDate && <span className="text-red-500">{errors.publishedDate.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Main Image</label>
        <input type="file" onChange={(e) => setMainImage(e.target.files[0])} className="w-full p-2 border rounded" required />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Sub Images (up to 5)</label>
        <input type="file" multiple onChange={(e) => setSubImages(Array.from(e.target.files))} className="w-full p-2 border rounded" />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create Book</button>
    </form>
  );
};

export default BookCreationForm;