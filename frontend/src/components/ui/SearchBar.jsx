import React, { useState } from 'react';
import Select, { components } from 'react-select';
import Search from '../../assests/Search.svg'








// import AsyncSelect from 'react-select/async';

// const loadOptions = (inputValue, callback) => {
//   fetch(`/api/books?search=${inputValue}`)
//     .then(response => response.json())
//     .then(data => {
//       callback(data.map(book => ({ value: book.id, label: book.title })));
//     });
// };



const customStyles = {
    control: (provided,state) => ({
      ...provided,
      backgroundColor: state.isSelected ?'#F1F1F1' :'#F1F1F1' ,
      
      color: '#F1F1F1' ,
      display: 'flex',
      borderRadius: 'px',
      
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #937DC2',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'rgba(147, 125, 194, 0.6)' : 'white',
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        backgroundColor: 'rgba(147, 125, 194, 0.6)',
        color: 'white',
      },
    }),
    input: (provided) => ({
        ...provided,
        marginLeft: '10px',  // Add some space after the icon
      }),
  };
  const CustomControl = ({ children, ...props }) => {
    return (
      <components.Control {...props}>
        {children}
          <img src={Search} alt="" /> {/* Search icon */}
      </components.Control>
    );
  };
  const customComponents = {
    DropdownIndicator: () => null,  // Remove dropdown arrow
    IndicatorSeparator: () => null, // Remove separator line
    Control: CustomControl,         // Custom control with search icon
  };
  
const options = [
    { value: 'fiction', label: 'Fiction' },
    { value: 'non-fiction', label: 'Non-Fiction' },
    { value: 'textbooks', label: 'Textbooks' },
    { value: 'science', label: 'Science' }
  ];

const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div>
  <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        components={customComponents} // Remove icons
        placeholder="Search for books or categories..."
      />
    </div>
  );
};

export default SearchBar;
