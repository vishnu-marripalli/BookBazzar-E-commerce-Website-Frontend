import React,{useEffect,useRef,useState} from 'react'
import ProductCard from './Productcard'
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Skeleton } from './ui/skeleton';
import Slider from 'react-slick';
import ApiCall from '../lib/ApiCall';
gsap.registerPlugin(ScrollTrigger);




const Sliderproduct =({title, category})=> {

// const UncategorizedBooks = useSelector((state)=>(state.features.books))
const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)

  const [books,setbooks]=useState([]);
  const [UncategorizedBooks, setUncategorizedBooks] = useState([])
  const wishlistProducts = useSelector(
    (state) => state.wishlist.books
  );

  useEffect(() => {
   ApiCall({
    url:'/api/v1/book/',
    method:"GET",
   
   }).then((response)=>{
    console.log(response.data)
    const books =response.data.data.docs
    if(!isAuthenticated){
      setUncategorizedBooks(books)
      setIsLoading(false);
    }
    const updatedProducts = books.map((book) => {
      const wishlist = Array.isArray(wishlistProducts)
        ? (wishlistProducts ).includes(book._id)
        : (wishlistProducts).has(book._id);
      return {
        ...book,
        wishlist,
      };
    });
    setUncategorizedBooks(updatedProducts);
   })
   setIsLoading(false);

  }, [])

      const [isLoading, setIsLoading] = useState(false);

      const productSliderRef = useRef(null);
      useEffect(() => {
        const productSliderElement = productSliderRef.current; // Access the current DOM element
    
        if (!productSliderElement) return;
        gsap.to(
          productSliderElement,
    
          {
            opacity: 1,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: productSliderElement,
              start: "top 80%", // Start animation when the top of the element is 80% in view
            },
          }
        );
      }, []);

      const settings = {
        
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable:true,
        autoplay: true,
       
        autoplaySpeed: 3000,
        
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,  
              centerPadding: "50px",
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
        prevArrow: <></>, // Hide the default previous arrow button
        nextArrow: <></>,
      //   customPaging: function (i) {
      //     return (
      //       <div
      //         style={{
      //           width: "50%", // Adjust the width of each slide to half the container width
      //           textAlign: "center",
      //         }}>
      //         {i + 1}
      //       </div>
      //     );
      //   },
      };
    
      const daysAgo = (days) => {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date;
      };
      
      function categorizeBooks(UncategorizedBooks) {
        const categories = {
          mostRated: [],
          trending: [],
          other: [],
        };
      
        const trendingThresholdDate = daysAgo(100); // Books created within the last 30 days are trending
        const mostRatedThreshold = 0; // Books with an average rating of 4.5 or higher are most rated
      
        UncategorizedBooks.forEach((book) => {
          const createdAtDate = new Date(book.publishedDate);
          if (book.rating?.averageRating >= mostRatedThreshold) {
            categories.mostRated.push(book);
          }
      
          if (createdAtDate >= trendingThresholdDate) {
            categories.trending.push(book);
          }
      
          // Add books to the 'other' category if they don't fall into most rated or trending
          if (book.rating?.averageRating < mostRatedThreshold && createdAtDate < trendingThresholdDate) {
            categories.other.push(book);
          }
        });

        return categories;
      }

      // const categorizeBooks = (books) => {
      //   return books.map((book) => {
      //     let category = "";
      
      //     // Check for Most Rated category (more than 400 reviews)
      //     if (book.rating.totalReviews > 400) {
      //       category = "Most Rated";
      //     }
      
      //     // Check for Trending category (rating above 4.6)
      //     if (book.rating.averageRating > 4.6) {
      //       category = category ? category + ", Trending" : "Trending";
      //     }
      
      //     return { ...book, category }; // Add the category field to each book object
      //   });
      // };
      
      // const categorizedBooks = categorizeBooks(books);
      // console.log(categorizedBooks);
      
      
     
    
      
      useEffect(() => {
        const categorizedBooks = categorizeBooks(UncategorizedBooks);
        
        if(title==="Most Rated"){
          setbooks(categorizedBooks.mostRated)
        }
        if(title==="Trending"){
          setbooks(categorizedBooks.trending)
        }
        
        
        return () => {
          
        }
      }, [UncategorizedBooks])
      


  return (
    <>
   <div
      ref={productSliderRef}
      className="w-full   sm:px-16 md:pl-[8rem] my-10 px-1 opacity-0 overflow-hidden ">
      <div className="sm:mb-10 my-3 ">
        <h3 className=" sm:text-4xl text-2xl font-semibold main-heading-font px-4">
          {title}
        </h3>
      </div>
      <div className="slider-container relative">
        {isLoading ? (
          <div className="flex gap-6">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] sm:w-[250px] w-[200px]  rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
              </div>
            </div>
            <div className="flex hidden md:block flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex hidden sm:block flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex hidden sm:block flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] sm:w-[250px] w-[200px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
              </div>
            </div>
          </div>
        ) : (
          <div className=''>
            {books.length > 4 ? (
              <Slider {...settings} className=''>
                {/* Render the Product component within Slider */}
                {books.map((book) => (
                  <div key={books._id}>
                    <ProductCard book={book} Home={true} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="grid md:grid-cols-4 grid-cols-2">
                {books.map((book) => (
                  <div key={books._id}>
                    <ProductCard book={book} Home={true} />
                  </div>
                ))}
                  </div>
            )}
            
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Sliderproduct;