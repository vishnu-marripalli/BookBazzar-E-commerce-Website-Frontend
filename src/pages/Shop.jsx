import React,{useState} from 'react'
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
  
 function Shop() {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = React.useState("newest");
    //handle sort and filter api using useeffect
    const books = useSelector((state)=>(state.features.books))

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
            {!isLoading && (
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
            )}
            
        </div>
   </>
  )
}
export default Shop