import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
//import { customers } from '../__mocks__/customers';
import { firebaseBuscar } from 'src/utils/FirebaseUtil';
import { useEffect } from 'react';
import { useState } from 'react';

const Customers = () => {
 
  const [clientes, setClientes] = useState([]);

 useEffect(()=> {
    buscarClientes();
 }, []);

 const buscarClientes = async () => {
  let resultado = await firebaseBuscar('clientes');
  setClientes(resultado);
 } 
return <>
    <Head>
      <title>
        Customers | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={clientes} />
        </Box>
      </Container>
    </Box>
  </>
 ;
    } 

Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
