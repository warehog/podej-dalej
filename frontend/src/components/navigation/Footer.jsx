import React from 'react';
import { Container, Typography, Link, Box, Grid2 as Grid } from '@mui/material';
import { Email, WhatsApp, Telegram, GitHub } from '@mui/icons-material';
import styled from '@emotion/styled';

const socialLinks = [
  {
    href: 'mailto:info@podej-dalej.pl',
    label: 'info@podej-dalej.pl',
    Icon: Email,
  },
  {
    href: 'https://wa.me/48667034754',
    label: 'WhatsApp',
    Icon: WhatsApp,
    target: '_blank',
  },
  {
    href: 'https://t.me/kudlatykaskader',
    label: 'Telegram',
    Icon: Telegram,
    target: '_blank',
  },
  {
    href: 'https://github.com/warehog/podej-dalej',
    label: 'GitHub',
    Icon: GitHub,
    target: '_blank',
  },
];

const SocialLink = ({ href, label, Icon, target }) => (
  <Link
    href={href}
    target={target}
    rel={target ? 'noopener noreferrer' : undefined}
    color="inherit"
    underline="hover"
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
      '&:hover': { color: 'secondary.main' },
    }}
  >
    <Icon fontSize="small" />
    {label}
  </Link>
);

const StyledFooter = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: ${({ theme }) => theme.spacing(4)} 0;
  height: var(--footer-height);
`;

const Footer = () => {
  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6} textAlign="center">
            <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
              {socialLinks.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Typography variant="body1">
            Created with ❤️
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <SocialLink href="https://github.com/warehog" label="Mateusz Wójcik" Icon={GitHub} target="_blank" />
            <SocialLink href="https://github.com/Fuzyn" label="Michał Wierzbicki"  Icon={GitHub} target="_blank" />
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
