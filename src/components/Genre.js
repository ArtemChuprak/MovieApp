import React from 'react';

export const Genre = ({ name }) => <span className='genresbut'>{name}</span>;
Genre.defaultProps = {
  name: '',
};