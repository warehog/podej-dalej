// UploadProgressModal.jsx
import React from 'react';
import { Dialog, Box, CircularProgress, Typography } from '@mui/material';
import {Trans} from "react-i18next";

const UploadProgressModal = ({ open }) => {
  return (
    <Dialog open={open}>
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 300,
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 3 }}>
            <Trans i18nKey="new_step.uploading_precessing" />
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            <Trans i18nKey="new_step.uploading_warning" />
        </Typography>
      </Box>
    </Dialog>
  );
};

export default UploadProgressModal;
