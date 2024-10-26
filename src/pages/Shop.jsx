import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pagebanner from '../components/Pagebanner';
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
  const [hasNextPage, setHasNextPage] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const [books, setBooks] = useState([]);
  
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [isWishlist, setIsWishlist] = useState(true);
  const wishlistProducts = useSelector((state) => state.wishlist.books);

  const onWishlistToggle = () => {
    setIsWishlist((prev) => !prev);
  };

  const fetchBooks = async (pageNum) => {
    try {
      setIsLoading(true);
      const response = await ApiCall({
        url: `https://bookbazzar-backend.onrender.com/api/v1/book/`,
        method: "GET",
        params: {
          limit: 10,
          page: pageNum,
          sortType: sortType,
        }
      });

      const newBooks = response.data.data.docs;
      setHasNextPage(response.data.data.hasNextPage);

      if (!isAuthenticated) {
        return newBooks;
      }

      return newBooks.map((book) => ({
        ...book,
        wishlist: Array.isArray(wishlistProducts)
          ? wishlistProducts.includes(book._id)
          : wishlistProducts.has(book._id)
      }));
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialBooks = async () => {
      const initialBooks = await fetchBooks(1);
      setBooks(initialBooks);
      setPage(1);
    };
    loadInitialBooks();
  }, [sortType, isWishlist, wishlistProducts, isAuthenticated]);

  const loadMoreHandler = async () => {
    const nextPage = page + 1;
    const newBooks = await fetchBooks(nextPage);
    setBooks((prev) => [...prev, ...newBooks]);
    setPage(nextPage);
  };

  return (
    <>
      <div>
        <Pagebanner title="Shop" />
        <div className="p-2 px-5 bg-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="border-2 border-primary bg-white w-[150px] px-6 py-2 text-sm text-primary rounded-sm">
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
                <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="lowToHigh">Price-Low to High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="highToLow">Price-High to Low</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="relevence">Relevance</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="aToz">Product A to Z</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="zToa">Product Z to A</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="">
          <div className="w-full grid grid-cols-2 justify-items-center md:grid-cols-5 px-5 md:py-10 py-5 sm:gap-4">
            {books.map((book) => (
              <div key={book._id}>
                <ProductCard 
                  book={book} 
                  Home={false} 
                  onwishlisttoggle={onWishlistToggle} 
                />
              </div>
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
        {hasNextPage && !isLoading && (
          <div className="text-center mt-4">
            <button
              className="border-2 border-primary hover:bg-primary hover:text-white bg-white w-[150px] px-6 py-2 text-sm text-primary rounded-sm my-3 duration-200 ease-in"
              onClick={loadMoreHandler}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Shop;