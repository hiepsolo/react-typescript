import './cell-list.css';
import React, { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';
import { useActions } from '../hooks/use-action';

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) =>
        order.map((id) => data[id])
    );
    const { fetchCells } = useActions();
    useEffect(() => {
        fetchCells();
    }, [])

    const renderedCells = cells.map((cell) => (
        <Fragment key={cell.id}>
            <CellListItem key={cell.id} cell={cell} />
            <AddCell previousCellId={cell.id} />
        </Fragment>
    ));

    return (
        <div className="cell-list">
            <AddCell forceVisible={cells.length === 0} previousCellId={null} />
            {renderedCells}
        </div>
    );
};

export default CellList;
