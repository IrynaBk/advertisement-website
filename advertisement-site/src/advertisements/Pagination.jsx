import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const [totalPages, setTotalPages] = useState(0);

function handlePageChange(event) {
    setCurrentPage(Number(event.target.textContent));
  }

export default function BasicPagination() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
}