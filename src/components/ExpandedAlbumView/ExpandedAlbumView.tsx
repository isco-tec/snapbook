import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Button, CloseButton, useDisclosure} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";
import {useFetchPhotos, useComponentVisible} from "../../hooks";
import {useExpandableStateContext} from "../../context";
import {IPhoto} from "../../types";
import {FullImageModal, SortableList, Thumbnail, Overlay} from "../../components";
import styled from "@emotion/styled";

const CardContentContainer = styled.div`
  background: #1c1c1e;
  position: relative;
  padding: 30px;
  min-width: 300px;
  border-radius: 10px;

  .open {
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 1;
    overflow: hidden;
    padding: 40px 0;
  }
`

const RemoveButtonContainer = styled.div`
  position: absolute;
  background: white;
  top: -5px;
  right: -5px;
  z-index: 5;
  border-radius: 50%;
`

export function ExpandedAlbumView() {
    const [filteredPhotos, setFilteredPhotos] = useState<IPhoto[]>([]);
    const [selectedImageSrc, setSelectedImageSrc] = useState<string>('');
    const {expandedAlbumId, handleToggleExpandAlbum} = useExpandableStateContext();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {ref} = useComponentVisible({
        initialIsVisible: true,
        onHide: () => isOpen ? null : handleToggleExpandAlbum(expandedAlbumId!)
    });

    const photos = useFetchPhotos(expandedAlbumId);
    useEffect(() => {
        if (!photos) return;
        setFilteredPhotos(photos);
    }, [photos])
    const removePhoto = (photoId: number) => {
        setFilteredPhotos(filteredPhotos.filter((photo) => photo.id !== photoId));
    };
    const onThumbnailClick = (key: number) => {
        const photo = filteredPhotos.find((photo) => photo.id === key);
        if (!photo) return;
        setSelectedImageSrc(photo.url);
        onOpen();
    }
    return (
        <Overlay open={true} blur={true}>
            <FullImageModal selectedImageSrc={selectedImageSrc} onOpen={onOpen} isOpen={isOpen} onClose={onClose}/>
            <motion.div layoutId={`card-container-${expandedAlbumId}`}>
                <CardContentContainer ref={ref}>
                    <motion.div layoutId={`card-toggle-container-open-${expandedAlbumId}`}>
                        <Button width={'100%'} onClick={() => handleToggleExpandAlbum(expandedAlbumId!)}><CloseIcon
                            boxSize={6}/></Button>
                    </motion.div>
                    <SortableList
                        items={filteredPhotos}
                        onChange={setFilteredPhotos}
                        renderItem={(item) => (
                            <SortableList.Item id={item.id}>
                                <RemoveButtonContainer>
                                    {/*<SortableList.DragHandle/>*/}
                                    <SortableList.RemoveButton
                                        customRemoveElement={<CloseButton size={'sm'}
                                                                          onClick={() => removePhoto(item.id)}/>}
                                        onClick={() => removePhoto(item.id)}/>
                                </RemoveButtonContainer>
                                <Thumbnail photo={item}
                                           onClick={(key) => onThumbnailClick(key)}/>
                            </SortableList.Item>
                        )}
                    />
                </CardContentContainer>
            </motion.div>
        </Overlay>
    );
}
