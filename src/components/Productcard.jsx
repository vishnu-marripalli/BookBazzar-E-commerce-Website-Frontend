import React,{useRef, useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from 'sonner'
import { FaShoppingCart } from "react-icons/fa";
import gsap from 'gsap';
import { useDispatch,useSelector } from 'react-redux';
import ApiCall from '../lib/ApiCall';
import { setWishlist } from '../features/Wishlist';
import { setCart } from '../features/cart';



const ProductCard = ({book,Home,onwishlisttoggle})=> {
    const size = Home
    const [hovered, setHovered] = useState(false);
    const [isWishlist, setIsWishlist] = useState(book.wishlist);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    const dispatch=useDispatch()
    const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)

    const renderStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars.push(<span key={i} className="text-star">★</span>);
        } else {
          stars.push(<span key={i} className="text-gray-300">★</span>);
        }
      }
      return stars;
    };

    const AddToCartHandler = async ( )=>{
    setIsLoading(true);
    await ApiCall({
      url: `https://bookbazzar-backend.onrender.com/api/v1/cart/item/${book._id}`,
      method: "POST",
      
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




    const toggleWishlist = async () => {
        setIsWishlist((prev) => !prev);
        const method = isWishlist ? "DELETE" : "POST";
        try {
          const response = await ApiCall({
            url: `https://bookbazzar-backend.onrender.com/api/v1/wishlist/${book._id}`,
            method,
          });
          if (response.data) {
            dispatch(setWishlist(response.data.data.Books));
            // eslint-disable-next-line no-restricted-globals
            // location.reload()
            onwishlisttoggle()
          }
        } catch (error) {
          console.log("Wishlist error:", error);
        }
        
      };
        

      // const Productref = useRef(null)
      // useEffect(() => {
        
      //   gsap.to(Productref.current,{
      //     opacity: 1,
      //     duration: 1,
      //     ease: "power3.out",
      //     scrollTrigger: {
      //       trigger: Productref.current,
      //       start: "top 0%", // Start animation when the top of the element is 80% in view
      //     },
      //   })
      
      //   return () => {
       
      //   }
      // }, [])

  return (

    <>
        <div className={size ?"shadow-lg border border-gray-200 m-2 p-2 min-w-[150px] lg:min-w-[200px] max-w-[250px]  overflow-hidden h-auto":
          "shadow-lg border border-gray-200 m-2 p-2 min-w-[150px] lg:min-w-[200px]  max-w-[170px] sm:max-w-[250px]  overflow-hidden h-auto"}>
            <div className="flex items-center justify-center">
            <img src={hovered ? book.subImages[0].url : book.mainImage.url}
            alt={book.description}
            className={size ? "h-[350px] p-2 max-w-fit cursor-pointer transition-all duration-500 ease-in-out delay-500 hover:scale-105 ":
              'h-[150px] sm:h-[350px] p-2 max-w-fit cursor-pointer transition-all duration-500 ease-in-out delay-500 hover:scale-105'
            }
            // onMouseEnter={() => setHovered(true)}
            // onMouseLeave={() => setHovered(false)}
            onClick={() => {
              window.scroll(0, 0);
              navigate(`/book/${book.title}/${book._id}`)
            }}
            loading="lazy" />
            </div>
            <div className="flex items-center">
                {renderStars(book.rating?.averageRating)}
            <span className="ml-2 text-xs text-gray-600">({book.rating?.totalReviews} reviews)</span>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-xl overflow-hidden h-[30px] font-semibold ">{book.title}</h1>
                <h1 className="text-xs " style={{color:'#4D4C4C'}}>{book.author.trim('')}</h1>
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-xl font-semibold">{book.price}</h1>
                        <div>
                        {isWishlist ? (
                        <FaHeart
                            onClick={toggleWishlist}
                            className="text-[18px] text-primary cursor-pointer"
                        />
                        ) : (
                        <FaRegHeart
                            onClick={toggleWishlist}
                            className="text-[18px] text-gray-700 cursor-pointer"
                        />
                        )}
                        </div>
                    </div>
                    <button className='border-2 w-full gap-2 flex items-center justify-center text-[18px] border-primary bg-primary  sm:px-6 py-2 text-sm text-white rounded-sm'
                    onClick={()=>{
                        if(!isAuthenticated){
                            toast('Please login to Add Book to cart');
                            navigate('/login');
                          }
                          else{
                            AddToCartHandler()
                          }
                    }}><FaShoppingCart className=' text-white '/>  Add to cart</button>
            </div>
        </div>
    </>




  )
}

export default ProductCard;