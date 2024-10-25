
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import Pagebanner from '../components/Pagebanner'
import ProductCard from '../components/Productcard';
import { TailSpin } from 'react-loader-spinner';
import ApiCall from '../lib/ApiCall';

const Wishlist = () => {
    const [isLoading, setIsLoading] = useState(false);
  

    const productIds = useSelector((state) => state.wishlist.books);
  const [books, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = productIds.map(async (bookId) => {
          const response = await ApiCall({
            url: `/api/v1/book/${bookId}`,
            method: "GET",
          });
          return {
            ...response.data.data,
            wishlist: true,
          };
        });

        // Wait for all product promises to resolve

        setProducts(await Promise.all(productPromises));
        setIsLoading(false);
        // Now you have all products, you can proceed with further processing
      } catch (err) {
        console.log("error is ; ",err)
        setIsLoading(false);
      }
    };

    // Call the fetchProducts function
    fetchProducts();
  }, [productIds]);










  return (
    <div>
       <Pagebanner title={"Wishlist"} />
       <div className=''>
            <div className="w-full grid grid-cols-2 justify-items-center md:grid-cols-5 px-5 md:py-10 py-5  sm:gap-4">
              {books.map((book, index) => (
                <React.Fragment key={book._id + Math.random() * 10}>
                  <div>
                    <ProductCard book={book} Home={false} />
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
    </div>
  )
}

export default Wishlist
