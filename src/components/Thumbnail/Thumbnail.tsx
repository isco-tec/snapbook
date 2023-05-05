import React from "react";
import {IPhoto} from "../../types";
import styled from "styled-components";
import {motion} from "framer-motion";
import {Text} from "@chakra-ui/react";

interface ThumbnailProps {
    photo: IPhoto;
    onClick: (photoId: number) => void;
}

export const ThumbnailImage = styled(motion.img)`
  width: 100%;
  height: auto;
  cursor: pointer;
`;


const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
  z-index: 1;
`;

const Container = styled(motion.div)`
  position: relative;
  @media (min-width: 768px) {
    min-width: 150px;
    min-height: 150px;
  }
`

const overlayVariants = {
    hidden: {opacity: 0},
    show: {},
    hover: {opacity: 1}
}

export function Thumbnail({photo, onClick}: ThumbnailProps) {
    const handleClick = () => {
        onClick(photo.id);
    };

    return (
        <Container onClick={handleClick}>
            <ThumbnailImage
                src={photo.thumbnailUrl}
                alt={photo.title}
            />
            <Overlay variants={overlayVariants} initial={'hidden'} whileHover={'hover'} animate={'show'}>
                <Text color={'#fff'} noOfLines={3}>{photo.title}</Text>
            </Overlay>
        </Container>
    );
};

export default Thumbnail;