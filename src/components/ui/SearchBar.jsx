import React from 'react';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import { useNavigate } from 'react-router-dom';
import Search from '../../assests/Search.svg';

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#F1F1F1',
    minHeight: '40px',
    borderRadius: '4px',
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
    padding: '8px 12px',
    '&:hover': {
      backgroundColor: 'rgba(147, 125, 194, 0.6)',
      color: 'white',
    },
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '4px',
    marginTop: '8px',
  }),
};

const CustomControl = ({ children, ...props }) => (
  <components.Control {...props}>
    <div style={{ padding: '0 8px' }}>
      <img src={Search} alt="search" style={{ width: '20px', height: '20px' }} />
    </div>
    {children}
  </components.Control>
);

const SearchBar = () => {
  const navigate = useNavigate();

  const loadOptions = async (inputValue) => {
    if (!inputValue || inputValue.length < 2) {
      return [];
    }

    try {
      const response = await fetch(
        // `http://localhost:8000/api/v1/book/search?search=${encodeURIComponent(inputValue)}`
        `https://bookbazzar-backend.onrender.com/api/v1/book/search?search=${encodeURIComponent(inputValue)}`

      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      // Transform the data to include the URL-safe title
      return data.map(book => ({
        ...book,
        urlTitle: book.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      }));
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      // Navigate to the product page using the URL-safe title and ID
      navigate(`/book/${selectedOption.urlTitle}/${selectedOption.value}`);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <AsyncSelect
        cacheOptions
        defaultOptions={false}
        loadOptions={loadOptions}
        onChange={handleChange}
        styles={customStyles}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          Control: CustomControl
        }}
        placeholder="Search for books..."
        noOptionsMessage={({ inputValue }) => 
          !inputValue 
            ? "Start typing to search..." 
            : "No books found"
        }
        isSearchable={true}
      />
    </div>
  );
};

export default SearchBar;