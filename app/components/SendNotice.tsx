import { Button, TextField } from '@mui/material';

export default function SendNotice() {
  return (
    <>
      <TextField
        id="standard-multiline-static"
        multiline
        rows={4}
        placeholder="Draw something here..."
        variant="filled"
        fullWidth
      />
      <Button variant="text" fullWidth>
        Send Notice
      </Button>
    </>
  );
}
