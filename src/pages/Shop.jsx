import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import Pagebanner from '../components/Pagebanner'
import ProductCard from '../components/Productcard';
import { TailSpin } from 'react-loader-spinner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../components/ui/dropdown-menu";
import ApiCall from '../lib/ApiCall';
  
 function Shop() {
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasnxtpage, sethasnxtpage] = useState(false);
    const [sortType, setSortType] = useState("newest");
    const [books, setbooks] = useState([])
    //handle sort and filter api using useeffect
    // const books = useSelector((state)=>(state.features.books))
    const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)
    const [isWishlist, setIsWishlist] = useState(true);


    const wishlistProducts = useSelector(
      (state) => state.wishlist.books
    );
    const onwishlisttoggle =()=>{
      setIsWishlist((prev)=>!prev)
    }

    useEffect(() => {
     ApiCall({
      url:'/api/v1/book/',
      method:"GET",
      params:{
        limit: 10,
        page: 1,
        sortType,
      }
     }).then((response)=>{
      // console.log(response.data)
      const books =response.data.data.docs
      sethasnxtpage(response.data.data.hasNextPage)
      if(!isAuthenticated){
        setbooks(books)
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
      setbooks(updatedProducts);
     })
     setIsLoading(false);

    }, [sortType,page,isWishlist])
    

  return (
   <>
        <div>
            <Pagebanner title={"Shop"} />
            <div className="p-2 px-5 bg-white">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button  className="border-2 border-primary bg-white w-[150px] px-6 py-2 text-sm text-primary rounded-sm">
                    Sort & Filter
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sort & Filter</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                    value={sortType}
                    onValueChange={setSortType}
                    >
                    <DropdownMenuRadioItem value="newest">
                        Newest
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="lowToHigh">
                        Price-Low to High
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="highToLow">
                        Price-High to Low
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="oldest">
                        Oldest
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="relevence">
                        Relevence
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="aToz">
                        Product A to Z
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="zToa">
                        Product Z to A
                    </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className=''>
            <div className="w-full grid grid-cols-2 justify-items-center md:grid-cols-5 px-5 md:py-10 py-5  sm:gap-4">
              {books.map((book, index) => (
                <React.Fragment key={book._id + Math.random() * 10}>
                  <div>
                    <ProductCard book={book} Home={false} onwishlisttoggle={onwishlisttoggle} />
                  </div>
                </React.Fragment>
              ))}
            </div>
            </div>
            {isLoading && (
              <div className="h-80 flex items-center justify-center">
                <TailSpin
                  visible={true}
                  height="50"
                  width="50"
                  color="#937DC2"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
            {hasnxtpage && (!isLoading && (
              <div className="text-center mt-4">
                <button
                  className="border-2 border-primary hover:bg-primary hover:text-white bg-white w-[150px] px-6 py-2 text-sm text-primary rounded-sm my-3 duration-200 ease-in"
                  onClick={() => {
                    setIsLoading((prev)=> !prev)
                    setPage((prev) => prev + 1);
                  }}
                >
                  Load More
                </button>
              </div>
            ))}
            
        </div>
   </>
  )
}
export default Shop