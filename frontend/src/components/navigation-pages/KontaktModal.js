import React from "react";
import { Modal, Box, Typography, Link, Grid, Button, Container } from "@mui/material";
import { Email, WhatsApp, Telegram, GitHub } from "@mui/icons-material";
import styled from "@emotion/styled";
import {Trans} from "react-i18next";

// Styled modal box
const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  borderRadius: 8,
  boxShadow: 24,
  padding: 20,
  textAlign: "center",
});

const KontaktModal = ({ open, handleClose }) => (
  <Modal open={open} onClose={handleClose}>
    <ModalBox>
      <Typography variant="h6" sx={{ mb: 2 }}>
          <Trans i18nKey="contact" />
      </Typography>

      <Container maxWidth="sm">
        <Grid container spacing={2} justifyContent="center">
          {/* Email */}
          <Grid item xs={12}>
            <Link
              href="mailto:info@podej-dalej.pl"
              color="inherit"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                "&:hover": { color: "secondary.main" },
              }}
            >
              <Email fontSize="small" />
              info@podej-dalej.pl
            </Link>
          </Grid>

          {/* WhatsApp */}
          <Grid item xs={12}>
            <Link
              href="https://wa.me/48667034754"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                "&:hover": { color: "secondary.main" },
              }}
            >
              <WhatsApp fontSize="small" />
              WhatsApp
            </Link>
          </Grid>

          {/* Telegram */}
          <Grid item xs={12}>
            <Link
              href="https://t.me/kudlatykaskader"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                "&:hover": { color: "secondary.main" },
              }}
            >
              <Telegram fontSize="small" />
              Telegram
            </Link>
          </Grid>

          {/* GitHub */}
          <Grid item xs={12}>
            <Link
              href="https://github.com/warehog/podej-dalej"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                "&:hover": { color: "secondary.main" },
              }}
            >
              <GitHub fontSize="small" />
              GitHub
            </Link>
          </Grid>
        </Grid>
      </Container>

      <Button
        onClick={handleClose}
        sx={{ mt: 3 }}
        variant="contained"
        fullWidth
      >
          <Trans i18nKey="close" />
      </Button>
    </ModalBox>
  </Modal>
);

export default KontaktModal;
