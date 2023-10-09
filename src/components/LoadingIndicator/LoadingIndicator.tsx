import { CircularProgress, Stack } from '@mui/material';

const LoadingIndicator = () => {
  return (
    <Stack alignItems="center" spacing={5}>
      <CircularProgress />
    </Stack>
  );
};

export default LoadingIndicator;
