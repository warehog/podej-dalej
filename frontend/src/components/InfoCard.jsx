import React from 'react';
import { useTheme, useMediaQuery, Typography, Container } from '@mui/material';
import { InfoStepsCard, InfoStepsCardIconBox, InfoStepsCardContent } from './styled-components';
import PropTypes from 'prop-types';
import './InfoCard.css'
import {Trans} from "react-i18next";

const InfoCard = ({ index, icon }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const Icon = icon;
    return (
        <InfoStepsCard className="info-card">
            {!isMobile && (
                <InfoStepsCardIconBox>
                    <Icon />
                </InfoStepsCardIconBox>
            )}
            <InfoStepsCardContent>
                {isMobile && (
                    <Container sx={{ display: 'flex', justifyContent: 'center' , flexDirection: 'row', alignItems: 'center'}}>
                        <InfoStepsCardIconBox>
                            <Icon />
                        </InfoStepsCardIconBox>
                        <Typography variant="h6" gutterBottom>
                            <Trans i18nKey={`instruction_steps.${index}_label`} />
                        </Typography>
                    </Container>
                )}
                {!isMobile && (
                    <Typography variant="h6" gutterBottom>
                        <Trans i18nKey={`instruction_steps.${index}_label`} />
                    </Typography>
                )}
                <div className='info-card-description'>
                    <Trans i18nKey={`instruction_steps.${index}_description`} />
                </div>
            </InfoStepsCardContent>
        </InfoStepsCard>
    );
};

InfoCard.propTypes = {
    index: PropTypes.number.isRequired,
    icon: PropTypes.element,
};

export default InfoCard;