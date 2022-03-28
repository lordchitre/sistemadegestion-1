// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, setDoc, deleteDoc} from "firebase/firestore";
import { objectOf } from "prop-types";
import { uuid } from 'uuidv4';


//export function firebaseConfig () {
//token: appsgsst 0D88F575-3D4E-40B8-B9F6-4258D0EC3608
const config = {
  apiKey: "AIzaSyDI2uxQT9yiU65eUioh9J8oyxt_Dicu4Vo",
  authDomain: "bdlaudiaz.firebaseapp.com",
  projectId: "bdlaudiaz",
  storageBucket: "bdlaudiaz.appspot.com",
  messagingSenderId: "297204494972",
  appId: "1:297204494972:web:84b0dd23db8ba6c7e10ff9",
  measurementId: "G-GY02FP08DC"
};

// Initialize Firebase
const app = initializeApp(config);
const analytics = getAnalytics(app);

//}

export function firebaseRegisterUsers (email, password) {
 return createUserWithEmailAndPassword (getAuth(), email, password)
  .then((datosauth) =>{
  
    const uid = datosauth.user.uid;
    const email = datosauth.user.email;
    const data = { uid, email };

    //console.table(JSON.stringify(data));
    return data;
  })
}

export async function firebaseInitialSesson (email, password) {
 try {
  let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
//credenciales.user.

 } catch (e) { 
   return false;
 }
  return true;
}

export async function firebaseBuscar ( coleccionABuscar){
 let listado = [];
 const consulta =  collection(getFirestore(), coleccionABuscar);
 const resultado = await getDocs(consulta);

resultado.forEach((doc) => {
  const data = doc.data();
  listado =  [...listado, data];
});

return listado;

}
export function firebaseCrear(coleccion, objeto) {
  objeto.id = uuid();
  let referencia = doc(getFirestore(), coleccion, objeto.id);
  setDoc(referencia, objeto);
}

export async function firebaseEliminar(coleccion, id) {

await deleteDoc(doc(getFirestore(), coleccion, id));
}

