import React, {useMemo, useState} from "react";
import type {ReactNode} from "react";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import type {Active, UniqueIdentifier} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates
} from "@dnd-kit/sortable";

import {DragHandle, Grid, RemoveButton, SortableItem, SortableOverlay} from "./components";

interface BaseItem {
    id: UniqueIdentifier;
}

interface ISortableListProps<T extends BaseItem> {
    items: T[];

    onChange(items: T[]): void;

    renderItem(item: T): ReactNode;

    numberOfColumns?: number;
}

export function SortableList<T extends BaseItem>({
                                                     items,
                                                     onChange,
                                                     renderItem,
                                                     numberOfColumns = 4
                                                 }: ISortableListProps<T>) {
    const [active, setActive] = useState<Active | null>(null);
    const activeItem = useMemo(
        () => items.find((item) => item.id === active?.id),
        [active, items]
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    return (
        <DndContext
            sensors={sensors}
            onDragStart={({active}) => {
                setActive(active);
            }}
            onDragEnd={({active, over}) => {
                if (over && active.id !== over?.id) {
                    const activeIndex = items.findIndex(({id}) => id === active.id);
                    const overIndex = items.findIndex(({id}) => id === over.id);

                    onChange(arrayMove(items, activeIndex, overIndex));
                }
                setActive(null);
            }}
            onDragCancel={() => {
                setActive(null);
            }}
        >
            <SortableContext items={items}>
                <Grid columns={numberOfColumns}>
                    {items.map((item) => (
                        <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
                    ))}
                </Grid>
            </SortableContext>
            <SortableOverlay>
                {activeItem ? renderItem(activeItem) : null}
            </SortableOverlay>
        </DndContext>
    );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
SortableList.RemoveButton = RemoveButton;
