import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CompanyListResults } from '../components/company/company-list-results';
import { CompanyListToolbar } from '../components/company/company-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
//import { customers } from '../__mocks__/customers';
import { firebaseBuscar } from 'src/utils/FirebaseUtil';
import { useEffect } from 'react';
import { useState } from 'react';

const Companys = () => {
 
 const [companys, setCompany] = useState([]);

 useEffect(()=> {
   buscarCia();
 }, []);

 const buscarCia = async () => {
 let resultado = await firebaseBuscar('companys');
  setCompany(resultado);
 } 
return <>
    <Head>
      <title>
        Companys | Material Kit
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
        <CompanyListToolbar />
        <Box sx={{ mt: 3 }}>
          <CompanyListResults companys={companys} />
        </Box>
      </Container>
    </Box>
  </>
 ;
    } 

Companys.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Companys;
