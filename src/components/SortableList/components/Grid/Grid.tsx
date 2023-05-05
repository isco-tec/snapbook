import React, { FC } from 'react';

type GridProps = {
    columns: number;
    children: React.ReactNode;
};

export const Grid: FC<GridProps> = ({ children, columns }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridGap: 10,
                maxWidth: '1600px',
                margin: '60px auto 0 auto',
            }}
        >
            {children}
        </div>
    );
};

export default Grid;
