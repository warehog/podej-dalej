import React from 'react';
import { Typography, Divider, Button} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NotesIcon from '@mui/icons-material/Notes';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import InfoCard from './InfoCard';
import {Trans} from "react-i18next";
import {
    OuterSectionContainer,
    OuterSectionIcon,
    InfoStepsCardsContainer,
    HorizontalButtonGroup,
} from './styled-components';

const stepsIcons = [AddAPhotoIcon, NotesIcon, AddCircleIcon, PersonAddAlt1Icon]

const Introduction = ({ onScrollToMultiPost, onScrollToCreatePost }) => {
    return (
        <OuterSectionContainer>
            <OuterSectionIcon>
                <InfoIcon />
            </OuterSectionIcon>

            <Typography variant="h1" color="primary" gutterBottom>
                <Trans i18nKey="hi" />
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h4" gutterBottom>
                <Trans i18nKey="introduction.congratulations" />
            </Typography>

            <Typography variant="body1" gutterBottom>
                <Trans i18nKey="introduction.invitation" />
            </Typography>

            {/* <Typography variant="body1" gutterBottom>
                    Przed Tobą niezwykła przygoda, której staniesz się częścią.
                </Typography> */}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" gutterBottom>
                <Trans i18nKey="instruction.title" />
            </Typography>

            <Typography variant="body1" gutterBottom className='info-section-paragraph'>
                <Trans i18nKey="instruction.part_one" />
            </Typography>
            <Typography variant="body1" gutterBottom className='info-section-paragraph'>
                <Trans i18nKey="instruction.part_two" />
            </Typography>
            <Typography variant="body1" gutterBottom>
                <Trans i18nKey="instruction.summary" />
            </Typography>

            <Divider sx={{ my: 2 }} />

            <InfoStepsCardsContainer>
                {stepsIcons.map((icon, index) => {
                    return <InfoCard key={index} index={index} icon={icon} />
                })}
            </InfoStepsCardsContainer>

            <HorizontalButtonGroup>
                <Button variant="contained" color="primary" onClick={onScrollToMultiPost}>
                    <Trans i18nKey="button.gallery" />
                </Button>
                <Button variant="contained" color="secondary" onClick={onScrollToCreatePost}>
                    <Trans i18nKey="button.add_step" />
                </Button>
            </HorizontalButtonGroup>

        </OuterSectionContainer>
    );
};

export default Introduction;
