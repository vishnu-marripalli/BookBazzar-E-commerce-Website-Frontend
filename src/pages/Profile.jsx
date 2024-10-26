import React, { useEffect, useState } from 'react'
import Pagebanner from '../components/Pagebanner'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/auth';
import Loading from '../components/Loading';
import Input from '../components/ui/Input';
import ApiCall from '../lib/ApiCall';
import Table from '../components/Table';

const Profile = () => {
    const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({})


  const [orders, setOrders] = React.useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await ApiCall({
          url: 'https://bookbazzar-backend.onrender.com/api/v1/order/orderdetails',
          method: 'POST',
          data: { role: 'User' },
        });
        setOrders(res.data.data.orders); // Assuming response structure matches
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchOrderDetails();
  }, []);
// Assuming `orders` is the data array from the API response
const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "_id",
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
  
  const data = orders.map(order => ({
    ...order,
  }));
  const fetchUserDetails = () => {
        setFormData({
      fullName: user?.fullName || '',
      email: user?.email || '',
      
    });
  };

  useEffect(() => {
    fetchUserDetails();
  }, [dispatch, user]); 


  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
        if (!value) error = 'Name is required';
        else if (value.length < 2) error = 'Name must be at least 2 characters';
        break;
      
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid';
        break;
      
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSaving(true);
      try {
        const response = await fetch('https://bookbazzar-backend.onrender.com/api/v1/user/self', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
          }),
        });

        const data = await response.json();
        console.log(data)
        const payload = {
          fullName:data.fullName,
          email:data.email
        };
        dispatch(setUser(payload));
        
        if (data.statusCode === 200) {
          fetchUserDetails();
        }
      } catch (error) {
        console.error('Update error:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loading />
      </div>
    );
  }

  return (
   <>
       <Pagebanner title='User Account' />
    <div className="bg-white  my-10 max-w-[700px] mx-2 lg:mx-auto border rounded-md outline-none p-6">
      <h2 className="text-2xl font-semibold mb-6">Hi! {user.fullName}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-6">
          <Input
            label="fullName"
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your FullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName ? errors.fullName : ''}
            success={touched.fullName && !errors.fullName}
            disabled={isSaving}
          />

          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : ''}
            success={touched.email && !errors.email}
            disabled={isSaving}
          />

        
        </div>

        <div className="flex mt-8 gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className={`
              hover:bg-white hover:text-primary   duration-200 ease-in border-2 border-primary bg-primary w-[150px] px-6 py-2 text-sm text-white rounded-sm
            `}
          >
            {isSaving && <Loading />}
            {isSaving ? 'Saving...' : 'Save changes'}
          </button>
          
          <button
            type="button"
            disabled={isSaving}
            className={`
              hover:bg-primary hover:text-white   duration-200 ease-in border-2 border-primary bg-white w-[150px] px-6 py-2 text-sm text-primary rounded-sm
            `}
            onClick={() => {
              fetchUserDetails(); // Reset to original user data instead of empty values
              setErrors({});
              setTouched({});
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    <div className=" my-10 mx-2 lg:mx-auto max-w-[1000px]">
        <Table
        columns={columns}
        data={orders}
        Heading="Your Orders"
        />
    </div>

   </>
  )
}

export default Profile
