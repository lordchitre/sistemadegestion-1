import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Avatar,Box,Button,Card,Checkbox,Table,TableBody,TableCell,TableHead,TablePagination,TableRow,Typography } from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { firebaseEliminar } from 'src/utils/FirebaseUtil';
import { WindowSharp } from '@mui/icons-material';

export const CompanyListResults = ({ companys, ...rest }) => {
  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCompanyIds;

    if (event.target.checked) {
      newSelectedCompanyIds = companys.map((company) => company.id);
    } else {
      newSelectedCompanyIds = [];
    }

    setSelectedCompanyIds(newSelectedCompanyIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCompanyIds.indexOf(id);
    let newSelectedComapnyIds = [];

    if (selectedIndex === -1) {
      newSelectedComapnyIds = newSelectedComapnyIds.concat(selectedCompanyIds, id);
    } else if (selectedIndex === 0) {
      newSelectedComapnyIds = newSelectedComapnyIds.concat(selectedCompanyIds.slice(1));
    } else if (selectedIndex === selectedCompanyIds.length - 1) {
      newSelectedComapnyIds = newSelectedComapnyIds.concat(selectedCompanyIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedComapnyIds = newSelectedComapnyIds.concat(
        selectedCompanyIds.slice(0, selectedIndex),
        selectedCompanyIds.slice(selectedIndex + 1)
      );
    }

    newSelectedComapnyIds(newSelectedComapnyIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCompanyIds.length === companys.length}
                    color="primary"
                    indeterminate={
                      selectedCompanyIds.length > 0
                      && selectedCompanyIds.length < companys.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Razón Social
                </TableCell>
                <TableCell>
                  Nit
                </TableCell>
                <TableCell>
                  Dirección
                </TableCell>
                <TableCell>
                  Región
                </TableCell>
                <TableCell>
                  Ciudad
                </TableCell>
                <TableCell>
                  Telefóno
                </TableCell>
                <TableCell>
                  Categoría
                </TableCell>
                <TableCell>
                  Fecha de  registro
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companys.slice(0, limit).map((company) => (
                <TableRow
                  hover
                  key={company.id}
                  selected={selectedCompanyIds.indexOf(company.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCompanyIds.indexOf(company.id) !== -1}
                      onChange={(event) => handleSelectOne(event, company.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                     
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {company.razonSocial} 
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {company.nit}
                  </TableCell>
                  <TableCell>
                  {company.direction}
                  </TableCell>
                  <TableCell>
                  {company.region}
                  </TableCell>
                  <TableCell>
                    {company.phone}
                  </TableCell>
                  <TableCell>
                  {company.city}
                  </TableCell>
                  <TableCell>
                  {company.category}
                  </TableCell>
                  <TableCell>
                  {company.created_at}
                  </TableCell>
                  <TableCell>
                  <Button
                       onClick = {() => { 
                         firebaseEliminar('companys', company.id)
                         alert('La empresa se eliminó')
                         window.location.reload(true);

                       }}
                       color="error"
                       variant="contained"
                     >
                       Eliminar
                     </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={companys.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CompanyListResults.propTypes = {
  companys: PropTypes.array.isRequired
};
