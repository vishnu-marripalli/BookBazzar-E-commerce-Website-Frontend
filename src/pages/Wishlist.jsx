
import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import Pagebanner from '../components/Pagebanner'
import ProductCard from '../components/Productcard';
import { TailSpin } from 'react-loader-spinner';

const Wishlist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const books = useSelector((state)=>(state.features.books))

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
