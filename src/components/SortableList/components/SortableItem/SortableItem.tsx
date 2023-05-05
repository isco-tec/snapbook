import React, {createContext, useContext, useMemo} from "react";
import type {CSSProperties, PropsWithChildren} from "react";
import type {
    DraggableSyntheticListeners,
    UniqueIdentifier
} from "@dnd-kit/core";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import styled from "@emotion/styled";

interface Props {
    id: UniqueIdentifier;
}

interface Context {
    attributes: Record<string, any>;
    listeners: DraggableSyntheticListeners;

    ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
    attributes: {},
    listeners: undefined,
    ref() {
    }
});

const StyledSortableButton = styled.button`
  display: flex;
  width: 12px;
  padding: 15px;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  touch-action: none;
  cursor: var(--cursor, pointer);
  border-radius: 5px;
  border: none;
  outline: none;
  appearance: none;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;

  :hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  :focus-visible {
    box-shadow: 0 0 0 2px #4c9ffe;
  }

  svg {
    flex: 0 0 auto;
    margin: auto;
    height: 100%;
    overflow: visible;
    fill: #919eab;
  }
`

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05),
  0 1px calc(3px / var(--scale-x, 1)) 0 rgba(34, 33, 81, 0.15);
  border-radius: calc(4px / var(--scale-x, 1));
  box-sizing: border-box;
  list-style: none;
  color: #333;
  font-weight: 400;
  font-size: 1rem;
  font-family: sans-serif;
  position: relative;
`;

export function SortableItem({children, id}: PropsWithChildren<Props>) {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable({id});
    const context = useMemo(
        () => ({
            attributes,
            listeners,
            ref: setActivatorNodeRef
        }),
        [attributes, listeners, setActivatorNodeRef]
    );
    const style: CSSProperties = {
        opacity: isDragging ? 0.4 : undefined,
        transform: CSS.Translate.toString(transform),
        transition
    };

    return (
        <SortableItemContext.Provider value={context}>
            <ListItem ref={setNodeRef} style={style} {...attributes} {...listeners} >
                {children}
            </ListItem>
        </SortableItemContext.Provider>
    );
}

export function DragHandle() {
    const {attributes, listeners, ref} = useContext(SortableItemContext);

    return (
        <StyledSortableButton {...attributes} {...listeners} ref={ref}>
            <svg viewBox="0 0 20 20" width="12">
                <path
                    d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
            </svg>
        </StyledSortableButton>
    );
}

interface IRemoveButtonProps {
    onClick: () => void;
    customRemoveElement?: JSX.Element;
}

export function RemoveButton({onClick, customRemoveElement}: IRemoveButtonProps) {
    // const {attributes, listeners, ref} = useContext(SortableItemContext);
    if (customRemoveElement) {
        return customRemoveElement;
    }
    return (
        <StyledSortableButton onClick={onClick}>
            <svg viewBox="0 0 20 20" width="12">
                <path
                    d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm3.707 9.293a1 1 0 0 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 1 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 1 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 10l2.293 2.293z"></path>
            </svg>
        </StyledSortableButton>
    );
}