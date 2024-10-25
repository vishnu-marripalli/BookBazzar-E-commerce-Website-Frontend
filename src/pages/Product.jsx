import React ,{useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Pagebanner from '../components/Pagebanner';
import Sliderproduct from '../components/Sliderproduct'
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setCart,initCart } from "../features/cart";


import gsap from 'gsap';
import { toast } from 'sonner';
import ApiCall from '../lib/ApiCall';

const Product =()=> {

    const {bookid} = useParams();
    const [Quantity,setQuantity]=useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [book,setbook]=useState({
        _id: "",
        title: "",
        author: "",
        wishlist: false,
        genre: "",
        description: "",
        mainImage: {
          url: "",
          public_id: "",
          _id: "",
        },
        condition: "",
        language: "",
        owner: "",
        price: 0,
        stock: 0,
        subImages: [
          {
            url: "",
            public_id: "",
            _id: "",
          },
        ],
        publishedDate: "",
        rating: {
          averageRating: 0,
          totalReviews: 0,
        },
        createdAt: "0",
        updatedAt: "0",
        __v: 0,
    })
    const [mainImage, setMainImage] = useState(book.mainImage); // State to store the main image
    const [subImages, setSubImages] = useState([...book.subImages]);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const subImagesContainerRef =useRef(null)
   
    const books = useSelector((state)=>(state.features.books))
    const handleSubImageClick = (image) => {
        // Slide animation
        
        setMainImage(image); // Set the clicked sub image as the main image
        gsap.fromTo(".main-image", { x: -100 }, { x: 0, duration: 0.5 });
      };
      const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
            stars.push(<span key={i} className="text-star text-xl">★</span>);
          } else {
            stars.push(<span key={i} className="text-gray-300 text-xl">★</span>);
          }
        }
        return stars;
      };

    useEffect(() => {
        ApiCall({
          url: `/api/v1/book/${bookid}`,
          method: "GET",
        })
          .then((res) => {
            console.log(res)
            setbook(res.data.data);
            setSubImages([...res.data.data.subImages]);
            setMainImage(res.data.data.mainImage);
          })
          .catch(() => {
            navigate("/404");
          });
        

      }, [bookid,books]);


      const AddToCartHandler = async ( )=>{
        setIsLoading(true);
        await ApiCall({
          url: `/api/v1/cart/item/${book._id}`,
          method: "POST",
          data:{
            quantity: Quantity,

          }
          
        })
          .then((response) => {
            setIsLoading(false);
            if (response.data) {
              dispatch(
                setCart({
                  cart: [...response.data.data.items],
                  totalPrice: response.data.data.cartTotal,
                  discountedTotalPrice: response.data.data.discountedTotal,
                })
              );
              toast("Product added to cart successfully ", {
                description: `${book.title}, ${book.description}, ${book.price}`,
                action: {
                  label: "Go to Cart",
                  onClick: () => {
                    navigate("/cart");
                  },
                },
              });
            }
            if (response.error) {
              setIsLoading(false);
              toast("Before adding the product to your cart, please login.", {
                action: {
                  label: "Login",
                  onClick: () => {
                    navigate("/login");
                  },
                },
              });
            }
          })
          .catch(() => {
            setIsLoading(false);
            toast.error(`${book.title} has already been in cart`);
          });
        }

   
  return (
    <>
    <Pagebanner title={book.title}/>
    <div className='md:min-h-[80vh] w-full md:px-14 sm:my-3 sm:px-6 px-4 py-4'>
        <div className='w-full flex flex-col md:flex-row'>
            <div className="md:w-[50%] w-full overflow-hidden flex md:flex-row flex-col-reverse items-center sm:items-start gap-2">
                <div 
                ref={subImagesContainerRef}
                className='flex md:flex-col flex-row overflow-hidden  gap-1 md:w-1/5'>
                    {subImages.map((image, index) => (
                    <div className="max-w-[200px] max-h-[250px] shadow-lg border flex items-center justify-center sm:p-4 p-1 border-gray-200"> 
                        <img
                        key={index}
                        src={image.url}
                        alt={``}
                        className="  cursor-pointer"
                        style={{ opacity: mainImage === image ? 1 : 0.7 }} // Change opacity based on active image
                        onClick={() => handleSubImageClick(image)}
                        loading="lazy"
                        />
                    </div>   
                  ))}
                </div>
                <div className="w-4/5 flex  shadow-lg border sm:py-4 border-gray-200  justify-center items-center  max-h-[100vh] overflow-hidden">
                  <img
                    src={mainImage.url}
                    alt="Main"
                    className=" sm:h-[70vh] main-image "
                    loading="lazy"
                  />
                </div>
            </div>
            <div className="md:w-[50%] w-full  gap-4 sm:gap-0 md:px-6 flex flex-col justify-between ">
                <h1 className='text-3xl  text-[#382C2C] font-semibold'>{book.title}</h1>
                <span className='sm:text-base text-[#4F4C57] '>{book.author}</span>
                <div className="flex items-center">
                {renderStars(book.rating?.averageRating)}
                <span className="ml-2 text-xs text-gray-600">({book.rating?.totalReviews} reviews)</span>
                </div>
                <h1 className="text-[#231F2D] text-2xl  font-bold">Rs. {book.price}</h1>
                <p className="text-[#4F4C57]">{book.description}</p>
                <div className="flex flex-row text-[#231F2D] items-center  gap-2">
                  <CiCircleMinus className='cursor-pointer text-[#231F2D]' size={30} 
                  onClick={()=>{
                    if (Quantity > 1) {
                        setQuantity((prev) => prev - 1);
                      }
                  }}/>
                    <span
                      className=" sm:text-lg text-base"
                      style={{ userSelect: "none" }}
                    >
                      {Quantity}
                    </span>
                  <CiCirclePlus className='cursor-pointer text-[#231F2D]' size={30} 
                  onClick={()=>{
                    if (Quantity < book.stock) {
                        setQuantity((prev) => prev + 1);
                      }
                    
                  }}/>
                </div>
                <div className=" flex md:flex-row flex-col sm:gap-16 gap-4">
                   <button className='hover:bg-white hover:text-primary   duration-200 ease-in border-2 border-primary bg-primary md:w-[250px] px-6 py-2 text-base sm:text-sm text-white rounded-sm'
                    onClick={AddToCartHandler}
                    >Add to cart</button>
                    <button className='hover:bg-primary hover:text-white   duration-200 ease-in border-2 border-primary bg-white md:w-[250px] px-6 py-2 text-base sm:text-sm text-primary rounded-sm'
                    >Favouite
                    </button>
                </div>
                <div className='border-[1px] my-2 border-primary h-0 sm:w-[85%]'></div>
                <div className=" md:grid md:grid-cols-2 md:grid-rows-3 flex flex-col gap-4 md:gap-2">
                    <div className='flex flex-row gap-4'>
                        <h1 className='text-light-voilet  text-base '>Genere :</h1><h1 className="text-base">{book.genre}</h1>
                    </div>
                    <div className='flex flex-row gap-4'>
                      <h1 className='text-light-voilet  text-base '>Condition :</h1><h1 className="text-base">{book.condition}</h1>
                    </div>
                    <div className='flex flex-row gap-4'>
                      <h1 className='text-light-voilet  text-base '>Lanuage :</h1><h1 className="text-base">{book.language}</h1>
                    </div>
                    <div className='flex flex-row gap-4'>
                      <h1 className='text-light-voilet  text-base '>Published Date :</h1><h1 className="text-base">{book.publishedDate}</h1>
                    </div>
                    <div className='flex flex-row gap-4'>
                      <h1 className='text-light-voilet  text-base '>Print length :</h1><h1 className="text-base">575</h1>
                    </div >
                    <div className='flex flex-row gap-4'>
                      <h1 className='text-light-voilet  text-base '>Dimension :</h1><h1 className="text-base">6×1.8×9 inches</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Sliderproduct title={"Trending"}/>
   </>
  )
}

export default Product