'use client';

import React from 'react';
import {Select} from "@/components/Select";
import useDropdownData from "@/hooks/useDropdownData";
import {OptionType} from "@/types/options";

const HomePage: React.FC = () => {
  const {data, error, loading} = useDropdownData()

  const handleChange = (selectedItem: OptionType) => {
    console.log('Selected:', selectedItem);
  };

  return (
      <div  className="p-16">
        <h1  className="text-2xl mb-4">Custom Select/Dropdown</h1>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {!loading && <Select options={data} onChange={handleChange} />}
      </div>
  );
};

export default HomePage;
