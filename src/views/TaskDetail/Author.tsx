import { Typography } from '@mui/material';
import React from 'react';

interface AuthorProps {
  name: string;
}

const Author: React.FC<AuthorProps> = ({ name }) => {
  return (
    <Typography variant="caption" gutterBottom marginRight={2}>
      {name}
    </Typography>
  );
};

export default Author;
