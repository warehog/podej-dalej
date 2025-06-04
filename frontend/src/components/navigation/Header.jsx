import React, { useState } from 'react';
import {Box, FormControl, MenuItem, Select, Toolbar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KontaktModal from '../navigation-pages/KontaktModal';
import { StyledButton, StyledAppBar } from '../styled-components';
import {Trans, useTranslation} from 'react-i18next';

const Header = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [openModal, setOpenModal] = useState({ kontakt: false, jakGrac: false, pomocy: false });

    const handleChange = (event) => {
        i18n.changeLanguage(event.target.value).then(() => {
            window.location.reload()
        });
    };

    const handleOpen = (modal) =>
        setOpenModal((prev) => ({ ...prev, [modal]: true }));
    const handleClose = (modal) =>
        setOpenModal((prev) => ({ ...prev, [modal]: false }));

    return (
        <>
            <StyledAppBar>
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                        <StyledButton onClick={() => handleOpen('kontakt')}>
                            <Trans i18nKey="contact" />
                        </StyledButton>
                        <StyledButton onClick={() => navigate('/pomocy')} >
                            <Trans i18nKey="help" />
                        </StyledButton>
                    </Box>
                    <FormControl sx={{ textAlign: 'right' }}>
                        <Select
                            labelId="language-select-label"
                            id="language-select"
                            value={i18n.language}
                            onChange={handleChange}
                            variant="standard"
                        >
                            <MenuItem value="en">🇺🇸 English</MenuItem>
                            <MenuItem value="pl-PL">🇵🇱 Polski</MenuItem>
                        </Select>
                    </FormControl>
                </Toolbar>
            </StyledAppBar>
            <Toolbar/>
            <KontaktModal
                open={openModal.kontakt}
                handleClose={() => handleClose('kontakt')}
            />
        </>
    );
};

export default Header;
