import React from "react";
import { Modal, Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Trans} from "react-i18next";

// Styled modal box
const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "500px",
  backgroundColor: "white",
  borderRadius: 12,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  maxHeight: "80vh",
});

// Scrollable container for the FAQ list
const ScrollableContent = styled(Box)({
  overflowY: "auto",
  maxHeight: "60vh",
  paddingRight: 10,
});

// Styled modern Accordion
const ModernAccordion = styled(Accordion)({
  backgroundColor: "#f9f9f9",
  borderRadius: 8,
  boxShadow: "none",
  border: "1px solid #ddd",
  "&:before": { display: "none" }, // Removes MUI default line
  "&:hover": {
    backgroundColor: "#f4f4f4",
  },
  "& .MuiAccordionSummary-root": {
    borderRadius: 8,
    transition: "all 0.3s ease",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "#1976d2",
  },
  "& .MuiAccordionDetails-root": {
    backgroundColor: "#ffffff",
    borderRadius: "0 0 8px 8px",
    padding: "12px",
  },
});

// FAQ Data
const faqItems = [
  { question: <Trans i18nKey="faq.q1" />, answer: <Trans i18nKey="faq.a1" /> },
  { question: <Trans i18nKey="faq.q2" />, answer: <Trans i18nKey="faq.a2" /> },
  { question: <Trans i18nKey="faq.q3" />, answer: <Trans i18nKey="faq.a3" /> },
  { question: <Trans i18nKey="faq.q4" />, answer: <Trans i18nKey="faq.a4" /> },
  { question: <Trans i18nKey="faq.q5" />, answer: <Trans i18nKey="faq.a5" /> },
  { question: <Trans i18nKey="faq.q6" />, answer: <Trans i18nKey="faq.a6" /> },
  { question: <Trans i18nKey="faq.q7" />, answer: <Trans i18nKey="faq.a7" /> }
];

const PomocyModal = ({ open, handleClose }) => (
  <Modal open={open} onClose={handleClose}>
    <ModalBox>
      <Typography sx={{ textAlign: "center", mb: 2, fontWeight: "bold", fontSize: "22px" }}>
        <Trans i18nKey="help" />
      </Typography>

      {/* Scrollable FAQ Section */}
      <ScrollableContent>
        {faqItems.map((item, index) => (
          <ModernAccordion key={index} sx={{ mt: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: "bold" }}>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </ModernAccordion>
        ))}
      </ScrollableContent>

      {/* Close Button */}
      <Button onClick={handleClose} sx={{ mt: 2, fontWeight: "bold" }} variant="contained" fullWidth>
        <Trans i18nKey="close" />
      </Button>
    </ModalBox>
  </Modal>
);

export default PomocyModal;
