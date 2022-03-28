import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Chekbox, Container, FormHelperText, Link,Checkbox,
         TextField, Typography,FormControl,InputLabel,Select,MenuItem  } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { firebaseCrear, firebaseBuscar, firebaseRegisterUsers } from 'src/utils/FirebaseUtil';
import { useEffect, useffect, useState} from 'react';


const newCustomers = (props) => {
  const [ companylist, setcompanylist ] = useState([]); 
  const [ authdata, setauthdata ] = useState({
    uid: '',
    email: '',
  })

  const { query } = useRouter();

  useEffect(() => {
    if(query.uid){
      setauthdata(query);   
    }
  }, [query]);


  const crearUser = (cliente) => {
    firebaseCrear('clientes', cliente);
    router.push('/customers');
  }

  useEffect(() => {
    firebaseBuscar('companys').then(res => {
       setcompanylist(res)
       

    });

  },[]);



  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone:'',
      address:'',
      location:'',
      dateBirth:'',
      password: '',
      created_at:'',
      id_company:'',
      estado:'1'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required(
          'Nombre / First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required(
          'Apellido / Last name is required'),
      phone: Yup
      .string()
      .max(25)
      .required(
        'Teléfono / phone is required'),
      address: Yup
      .string()
      .max(255)
      .required(
        'Dirección / address is required'),   
      location: Yup
      .string()
      .max(255)
      .required(
        'Región / location is required'),
      dateBirth: Yup
      .string()
      .max(255),
      //.required(
        //'dateBirth is required'),       
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    
    }),
       onSubmit :(cliente) => {
              crearUser(cliente);
            }

  });

 
  return (
    <>
      <Head>
        <title>
          Crear Cliente
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Registrar un nuevo usuario
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                
              </Typography>
            </Box>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="id_company"
                value={formik.values.id_company}
                label="Empresas"
                onChange={formik.handleChange}
                variant="outlined"
              >

                {companylist?.map((company) => {
                  return  <MenuItem key={company.id} value={company.id}>{company.razonSocial}</MenuItem>
                })}

              </Select>
            </FormControl>
         
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="Nombre"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Apellido"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
             <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Teléfono"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="phone"
              value={formik.values.phone}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.address && formik.errors.address)}
              fullWidth
              helperText={formik.touched.address && formik.errors.address}
              label="Dirección"
              margin="normal"
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="address"
              value={formik.values.address}
              variant="outlined"
            />
             <TextField
              error={Boolean(formik.touched.location && formik.errors.location)}
              fullWidth
              helperText={formik.touched.location && formik.errors.location}
              label="Región"
              margin="normal"
              name="location"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="location"
              value={formik.values.location}
              variant="outlined"
            />
             <TextField
              error={Boolean(formik.touched.dateBirth && formik.errors.dateBirth)}
              fullWidth
              helperText={formik.touched.dateBirth && formik.errors.dateBirth}
              label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fecha de nacimiento"
              margin="normal"
              name="dateBirth"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="date"
              value={formik.values.dateBirth}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            
              <TextField
              error={Boolean(formik.touched.created_at && formik.errors.created_at)}
              fullWidth
              helperText={formik.touched.created_at && formik.errors.created_at}
              label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fecha de registro"
              margin="normal"
              name="created_at"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="date"
              value={formik.values.created_at}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Crear
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
;}
export default newCustomers;
