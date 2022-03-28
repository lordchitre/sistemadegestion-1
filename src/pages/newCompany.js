import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Chekbox, Container, FormHelperText, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { firebaseCrear } from 'src/utils/FirebaseUtil';


const newCompany = () => {

  
  const router = useRouter();

  const crearCompany = (company) => {
    firebaseCrear('companys', company);
    router.push('/companys');
  }

  const formik = useFormik({
    initialValues: {
      razonSocial: '',
      nit: '',
      region: '',
      direction:'',
      city:'',
      phone:'',
      category:'',
      created_at:'',
      estado:'1'
    },
    validationSchema: Yup.object({
      razonSocial: Yup
        .string()
        .max(255)
        .required(
          'Razon Social is required'),
      nit: Yup
        .string()
        .max(255)
        .required(
          'Nit / nit is required'),
      region: Yup
          .string()
          .max(255)
          .required(
            'Región / location is required'),
      city: Yup
        .string()
        .max(255)
        .required(
        'Ciudad/ city is required'),
      direction: Yup
      .string()
      .max(255)
      .required(
        'Dirección / address is required'),   
      phone: Yup
        .string()
        .max(25)
        .required(
          'Teléfono / phone is required'),      
      category: Yup
        .string()
        .max(255)
        .required(
          'Categoría / category is required')
    
    }),
       onSubmit :(company) => {
              crearCompany(company);
            }

  });

 
  return (
    <>
      <Head>
        <title>
          Crear Empresa
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
                Registrar un nueva Empresa
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.razonSocial && formik.errors.razonSocial)}
              fullWidth
              helperText={formik.touched.razonSocial && formik.errors.razonSocial}
              label="Razón Social "
              margin="normal"
              name="razonSocial"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.razonSocial}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.nit && formik.errors.nit)}
              fullWidth
              helperText={formik.touched.nit && formik.errors.nit}
              label="Nit"
              margin="normal"
              name="nit"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.nit}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.region && formik.errors.region)}
              fullWidth
              helperText={formik.touched.region && formik.errors.region}
              label="Región"
              margin="normal"
              name="region"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="region"
              value={formik.values.region}
              variant="outlined"
            />
             <TextField
              error={Boolean(formik.touched.direction && formik.errors.direction)}
              fullWidth
              helperText={formik.touched.direction && formik.errors.direction}
              label="Dirección"
              margin="normal"
              name="direction"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="direction"
              value={formik.values.direction}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.city && formik.errors.city)}
              fullWidth
              helperText={formik.touched.city && formik.errors.city}
              label="Ciudad"
              margin="city"
              name="city"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="city"
              value={formik.values.city}
              variant="outlined"
            />
             <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Telèfono"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="phone"
              value={formik.values.phone}
              variant="outlined"
            />
            
            <TextField
              error={Boolean(formik.touched.category && formik.errors.category)}
              fullWidth
              helperText={formik.touched.category && formik.errors.category}
              label="Categoría"
              margin="normal"
              name="category"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="category"
              value={formik.values.category}
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
export default newCompany;