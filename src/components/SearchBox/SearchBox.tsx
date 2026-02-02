import React from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ onChange }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={onChange}
    />
  );
};

export default SearchBox;