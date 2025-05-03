// SuccessSnackbar.jsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import {Trans} from "react-i18next";

const SuccessSnackbar = ({ open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
        onClose={onClose}
      >
        <Trans i18nKey="new_entry_success" />
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
