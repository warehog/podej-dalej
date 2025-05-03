import React from "react";
import { Button, Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useNavigate } from "react-router-dom";
import {Trans} from "react-i18next"; // Import for navigation

// Styled page container
const PageContainer = styled(Container)({
    padding: "40px 20px",
    maxWidth: "800px",
});

// Styled modern Accordion
const ModernAccordion = styled(Accordion)({
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    boxShadow: "none",
    border: "1px solid #ddd",
    "&:before": { display: "none" },
    "&:hover": { backgroundColor: "#f4f4f4" },
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

const PomocyPage = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        window.scrollTo(0, 0); // Ensures the page scrolls to the top
        navigate("/");
    };
    
    return (
        <PageContainer>
            {/* Header */}
            <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}>
                <Trans i18nKey="help" /> - FAQ
            </Typography>
            {/* Back Button */}
            <Box sx={{ mt: 4, mb: 4, alignItems: "center", display: "flex", justifyContent: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNavigateHome()} // Navigate to the homepage
                    sx={{ fontWeight: "bold" }}
                >
                    <Trans i18nKey="back_to_main" />
                </Button>
            </Box>
            {/* FAQ Section */}
            {faqItems.map((item, index) => (
                <ModernAccordion key={index} sx={{ mb: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: "bold" }}>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                </ModernAccordion>
            ))}
        </PageContainer>
    );
};

export default PomocyPage;
