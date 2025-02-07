import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const ReusableTable = ({ columns, records, title, addAddress }) => {
  const formattedColumns = columns.map((col, index) => ({
    name: col.header,
    selector: col.accessor ? (row) => row[col.accessor] : undefined,
    cell: col.cell || undefined,
    sortable: true,
    // Apply sticky positioning for the last column (Manage)
    style: col.accessor === 'actions' ? { position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 10 } : {},
  }));

  return (
    <div className="table-container p-3 shadow-sm bg-white rounded" style={{ overflowX: 'auto' }}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 style={{ color: "--primary-color" }} className="mb-0">{title}AA</h2>
        {addAddress && (
          <Link to={addAddress} className="btn btn-outline-primary">
            Add {title}
          </Link>
        )}
      </div>

      <div style={{ overflow: 'auto' }}>
        <DataTable
          columns={formattedColumns}
          data={records}
          fixedHeader
          pagination
          highlightOnHover
          dense
          customStyles={{
            headCells: {
              style: {
                backgroundColor: 'rgb(212, 212, 212)',
                fontWeight: 'bold',
                fontSize: '1rem',
                color: '#2674b6',
                position: 'sticky',
                top: 0,
                zIndex: 1, // Ensure the header stays above the body
              },
            },
            cells: {
              style: {
                borderBottom: '1px solid rgb(212, 212, 212)',
                fontSize: '1rem',
              },
            },
            table: {
              style: {
                position: 'relative',
              },
            },
            rows: {
              style: {
                position: 'relative',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ReusableTable;
