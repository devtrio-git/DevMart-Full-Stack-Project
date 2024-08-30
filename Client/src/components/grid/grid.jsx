import styles from './grid.module.scss';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { useState } from 'react';

export default function Grid(props) {

    return (<div className={styles.grid_container}>
        <DataGrid
            rowKeyGetter={(r) => r[props.row_id_field ?? "id"]}
            style={{ opacity: props.loading ? "0.3" : "1" }}
            className="rdg-light"
            columns={props.columns}
            rows={props.loading ? [] : props.rows}
            rowHeight={props.rowHeight || 38}
            onCellClick={(args) => args.row && Object.keys(args.row).length > 0 && props.onRowClick?.(args.row)}
        />
    </div>);
}