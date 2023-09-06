import React, { useState } from 'react';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!searchName.trim()) {
      Notiflix.Notify.failure('Please enter text!');
      return;
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <div className={css.HeaderStyle}>
      <form onSubmit={handleSubmit} className={css.FormStyle}>
        <button type="submit" className={css.BtnStyle}>
          <span className={css.SpanStyle}>Search</span>
        </button>

        <input
          className={css.InputStyle}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder=""
          name="searchQuery"
          value={searchName}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
