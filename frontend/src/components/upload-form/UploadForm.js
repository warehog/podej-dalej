// src/components/CreatePostStepper.js

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import AttachmentsGrid from './AttachmentsGrid';
import MediaPicker from './MediaPicker';
import UploadProgressModal from './UploadProgressModal';
import SuccessSnackbar from './SuccessSnackbar';
import MapPicker from './MapPicker'; // Import the new MapPicker component

import { createPost } from '../../apis/PostApi';

import {
  HorizontalButtonGroup,
  OuterSectionContainer,
  OuterSectionIcon,
} from '../styled-components';
import {Trans} from "react-i18next";

const steps = [
  'new_step.add_photo',
  'new_step.add_location',
  'new_step.add_description'
];

const UploadForm = () => {
  const [post, setPost] = useState({
    location: '',
    title: 'blank',
    content: '',
    lat: '',
    lng: '',
    contact: '',
  });

  // State for attachments (photos)
  const [attachments, setAttachments] = useState([]);

  // Control steps
  const [activeStep, setActiveStep] = useState(0);

  // Uploading / success states
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Navigation blocking state (e.g., during upload)
  const [blockNavigation, setBlockNavigation] = useState(false);

  // Handle before unload to block navigation if necessary
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (blockNavigation) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [blockNavigation]);

  const handleAddAttachments = (newFiles) => {
    console.info('Adding files:', newFiles);
    setAttachments((prev) => [...prev, ...newFiles]);
  };
  const handleRemoveFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    setBlockNavigation(true);

    try {
      await createPost(post, attachments);
      window.location.reload();
      setPost({
        location: '',
        content: '',
        lat: '',
        lng: '',
        name: '',
        contact: '',
      });
      setAttachments([]);
      setShowSuccess(true);

      // setTimeout(() => {
      //   navigate('/');
      // }, 2000);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      setBlockNavigation(false);
    }
  };

  const handleLocationSelect = useCallback(({ lat, lng, location }) => {
    setPost((prev) => ({
      ...prev,
      lat,
      lng,
      location,
    }));
  }, []);

  const getStepContent = (step) => {
    switch (step) {
      case 0: // Step 1: Attachments
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                <Trans i18nKey="new_step.step_one_title" />
            </Typography>
            <Typography variant="caption" color="textSecondary">
                <Trans i18nKey="new_step.step_one_description" />
            </Typography>
            <AttachmentsGrid attachments={attachments} onRemoveFile={handleRemoveFile} />
            <MediaPicker
              onAddFiles={handleAddAttachments}
            />
          </Box>
        );

      case 1: // Step 2: Location
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                <Trans i18nKey="new_step.step_two_title" />
            </Typography>
            <Typography variant="caption" color="textSecondary">
                <Trans i18nKey="new_step.step_two_description" />
            </Typography>
            <TextField
              fullWidth
              label={<Trans i18nKey="new_step.chosen_location" />}
              value={post.location}
              disabled
              margin="normal"
            />
            <MapPicker
              onLocationSelect={handleLocationSelect}
              initialPosition={[post.lan || 51.505, post.lng || 19.000]} />
          </Box>
        );

      case 2: // Step 3: Description
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                <Trans i18nKey="new_step.step_three_title" />
            </Typography>
            <TextField
              fullWidth
              label={<Trans i18nKey="new_step.describe_location"/>}
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              fullWidth
              label={<Trans i18nKey="new_step.contact" />}
              value={post.contact || ''}
              onChange={(e) => setPost({ ...post, contact: e.target.value })}
              margin="normal"
            />
            <Typography variant="caption" color="textSecondary">
                <Trans i18nKey="new_step.step_three_description" />
            </Typography>
          </Box>
        );

      default:
        return <Trans i18nKey="new_step.unknown_step" />;
    }
  };

  return (
    <OuterSectionContainer>
        <OuterSectionIcon>
          <AddPhotoAlternateIcon/>
        </OuterSectionIcon>
        <Typography variant="h2" color="primary" gutterBottom>
          <Trans i18nKey="new_step.title" />
        </Typography>
        <Typography variant="h6" color="primary">
            <Trans i18nKey="new_step.description" />
        </Typography>

      <Stepper sx={{mt: 2}} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel><Trans i18nKey={label} /></StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {getStepContent(activeStep)}
      </Box>

      <HorizontalButtonGroup>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
            <Trans i18nKey="button.back" />
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant="contained" color="primary">
              <Trans i18nKey="button.next_step" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            disabled={isUploading}
          >
            {isUploading ? <Trans i18nKey="button.sending" /> : <Trans i18nKey="button.send" />}
          </Button>
        )}
      </HorizontalButtonGroup>

      <UploadProgressModal open={isUploading} />
      <SuccessSnackbar open={showSuccess} onClose={handleCloseSuccess} />
    </OuterSectionContainer>
  );
};

export default UploadForm;
