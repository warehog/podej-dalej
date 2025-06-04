import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { getPosts } from "../apis/PostApi";

import Timeline from './timeline/Timeline';
import TimelineItem from './timeline/TimelineItem';

import MapIcon from '@mui/icons-material/Map';

import { OuterSectionContainer, OuterSectionIcon } from './styled-components';
import {Trans} from "react-i18next";

const Gallery = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts((response) => setPosts(response.data))
    }, []);

    return (
        <OuterSectionContainer>
            <OuterSectionIcon>
                <MapIcon/>
            </OuterSectionIcon>
            <Typography variant="h6" gutterBottom>
                <Trans i18nKey="newest_steps" />
            </Typography>
            <Timeline>
                {posts.map((post, index) => (
                    <TimelineItem key={index}
                        time={ post.created_at }
                        place={ post.location }
                        header={ post.title }
                        paragraph={ post.content }
                        attachments={ post.attachments }
                    />
                ))}
            </Timeline>
        </OuterSectionContainer>
    );
};

export default Gallery;