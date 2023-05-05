import {ReactNode} from 'react';
import styled from "styled-components";
import {useWindowSize} from "react-use";

interface OverlayProps {
    open: boolean;
    children?: ReactNode;
    blur?: boolean;
}

interface IOverlayWrapper {
    width: number;
    height: number;
}

const OverlayWrapper = styled.div<IOverlayWrapper>`
  z-index: 1;
  position: fixed;
  background: rgba(0, 0, 0, 0.25);
  will-change: opacity;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &.blur {
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
  }
`
export const Overlay = ({open, children, blur}: OverlayProps) => {
    const {width, height} = useWindowSize();
    return (
        <OverlayWrapper  width={width} height={height} className={`${blur ? 'blur' : ''}`}
                        hidden={!open}>
            {children}
        </OverlayWrapper>
    );
}

export default Overlay;