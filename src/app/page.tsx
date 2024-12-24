'use client';

import React from 'react';
import {Select} from "@/components/Select";
import useDropdownData from "@/hooks/useDropdownData";

const HomePage: React.FC = () => {
  const {data, error, loading} = useDropdownData()

  const handleChange = (selectedItem: OptionType) => {
    console.log('Selected:', selectedItem);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
      <div  className="p-16">
        <h1  className="text-2xl mb-4">Custom Select/Dropdown</h1>
        <Select options={data} onChange={handleChange} />
      </div>
  );
};

export default HomePage;
