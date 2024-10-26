import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Pagebanner from '../components/Pagebanner';
import ApiCall from '../lib/ApiCall';
import Table from '../components/Table';
import OrderStatistics from '../components/Orderchart';
import { toast } from 'sonner';
import { ThreeDots } from 'react-loader-spinner';

const BookCreationForm = () => {
  const { register,reset, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    setIsLoading(true)
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
      // const response = await axios.post('http://localhost:8000/api/v1/book/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Assuming you store the token in localStorage
        }
      });
      console.log('Book created:', response.data);
      setIsLoading(false)
      toast.success('Book created successfully!', {
        position: 'top-center',
        autoClose: 3000,
      });
  
     
      setMainImage(null);
      setSubImages([]);
      reset(); // If you are using react-hook-form's reset
      } catch (error) {
      console.error('Error creating book:', error);
      setIsLoading(false)
      toast.error('Error while creating Book', {
        position: 'top-center',
        autoClose: 3000,
      });
      // Handle error (e.g., show error message)
    }
  };

  const [orders, setOrders] = React.useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Track the total number of pages



  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await ApiCall({
          url: 'https://bookbazzar-backend.onrender.com/api/v1/order/orderdetails',
          method: 'POST',
          data: { role: 'Admin' },
          params: {
            limit: 10, // Limit the number of categories per page
            page,      // Current page number
          },
        });
        // console.log(res.data)
        setOrders(res.data.data.orders);
        setTotalPages(res.data.data.pagination.pages); // Set total pages from the API response
        // Assuming response structure matches
      } catch (error) {
        console.log(error);
      }
    };
   
    fetchOrderDetails();
  }, [page]);
// Assuming `orders` is the data array from the API response
const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "_id",
      },
      {
        Header: "Customer",
        accessor: "user.email",
      },
      {
        Header: "Book",
        accessor: "orderItems.book.title",
      },
      
      {
        Header: "Quantity",
        accessor: "orderItems.quantity",
      },
      {
        Header: "Price",
        accessor: "orderItems.book.price",
      },
      {
        Header: "Payment Status",
        accessor: "paymentInfo.paymentStatus",
      },
      {
        Header: "Order Status",
        accessor: "orderStatus",
      },
    ],
    []
  );
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1); // Move to the next page
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1); // Move to the previous page
    }
  };

  
  const data = orders.map(order => ({
    ...order,
  }));

  return (
    <>
      <Pagebanner title={"Sell Your Books"} />
      <div className="flex md:px-10 gap-5 overflow-hidden my-10 flex-col lg:flex-row w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto lg:w-1/3 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Add your Book</h2>
          
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
              <select {...register('condition', { required: 'Condition is required' })} className="w-full p-2 border rounded">
                <option value="">Select condition</option> {/* Default option */}
                <option value="NEW">NEW</option>
                <option value="USED">USED</option>
              </select>
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

          <button type="submit" className="w-full hover:bg-white hover:text-primary   duration-200 ease-in border-2 border-primary bg-primary w-[150px] px-6 py-2 text-sm text-white rounded-sm">Sell Your Book</button>
        </form>
        <div className="lg:w-2/3 p-4 lg:min-h-[500px] flex flex-col ">
        <OrderStatistics />
        <Table
        columns={columns}
        data={orders}
        Heading="Order List"
        />
        <div className="pagination-controls flex w-full justify-between mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={`px-3 py-2 bg-gray-300 rounded ${
                page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
              }`}
            >
              Previous
            </button>
            <span className="mx-2">Page {page} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`px-3 py-2 bg-gray-300 rounded ${
                page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
              }`}
            >
              Next
            </button>
        </div>
        </div>
      </div>
      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-white z-50">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#937DC2"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
};

export default BookCreationForm;