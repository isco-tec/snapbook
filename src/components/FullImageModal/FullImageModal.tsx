import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Image, CloseButton
} from '@chakra-ui/react'
import styled from "styled-components";

interface IFullImageModalProps {
    onOpen: () => void;
    isOpen: boolean;
    onClose: () => void;
    selectedImageSrc: string;
}

const CloseButtonContainer = styled.div`
  position: absolute;
  background: white;
  color: #1c1c1e;
  top: -10px;
  right: -10px;
  z-index: 5;
  border-radius: 50%;
`

export function FullImageModal({onClose, onOpen, isOpen, selectedImageSrc}: IFullImageModalProps) {
    return (
        <>
            <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg='blackAlpha.300'
                              backdropFilter='blur(9px) '/>
                <ModalContent>
                    <ModalBody p={0}>
                        <CloseButtonContainer>
                            <CloseButton onClick={onClose}/>
                        </CloseButtonContainer>
                        <Image src={selectedImageSrc}
                               alt={'Album item full sized preview'}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}