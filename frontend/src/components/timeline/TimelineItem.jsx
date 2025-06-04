// TimelineItem.jsx
import React from 'react';
import TimelineItemMUI from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import { Paper, Typography, useTheme, useMediaQuery} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import ImageGallery from '../image-gallery/ImageGallery';
import './TimelineItem.css';
import {Trans, useTranslation} from "react-i18next";

const timeAgo = (dateString, t) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} ${t("time_periods.second")}${getValueAppendix(diffInSeconds)}`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${t("time_periods.minutes")}${getValueAppendix(minutes)}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${t("time_periods.hours")}${getValueAppendix(hours)}`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${t("time_periods.days")}${getValueAppendix(days)}`;
  }
};

const getValueAppendix = (value) => {
  // 1 -> 'a'
  // 2-4 -> 'y'
  // x2-x4 -> 'y'

  if (value === 1) {
    return 'a';
  } else if (value >= 2 && value <= 4) {
    return 'y';
  } else if (value > 20 && value % 10 >= 2 && value % 10 <= 4) {
    return 'y';
  } else {
    return '';
  }
}


const TimelineItem = ({ time, place, header, paragraph, attachments }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { t } = useTranslation();

  return (
    <TimelineItemMUI
      className={`timeline-item ${isMobile ? 'mobile' : ''}`}
    >
      <TimelineSeparator
        className={`timeline-separator ${isMobile ? 'mobile' : ''}`}
      >
        <TimelineDot
          className={`timeline-dot ${isMobile ? 'mobile' : ''}`}
          style={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
          }}
        >
          <PlaceIcon color="primary" />
        </TimelineDot>
      </TimelineSeparator>

      <TimelineContent
        className={`timeline-content ${isMobile ? 'mobile' : ''}`}
      >
        <Paper
          elevation={2}
          className={`timeline-paper ${isMobile ? 'mobile' : ''}`}
        >
          <Typography variant="h6" className="time-place">
            {place}
            <span className="separator-dot">•</span>
          </Typography>
          <Typography variant="body2" className="time-ago">
            {timeAgo(time, t)} <Trans i18nKey="ago" />
          </Typography>


          {/* Image Gallery */}
          <ImageGallery attachments={attachments} />
          
          {/* Paragraph */}
          <div className="paragraph">
            {paragraph}
          </div>
        </Paper>
      </TimelineContent>
    </TimelineItemMUI>
  );
};

export default TimelineItem;
