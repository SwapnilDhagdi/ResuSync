
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext.jsx';

createRoot(document.getElementById("root")).render(

  <BrowserRouter>
  <AuthProvider>
    <App></App>
  </AuthProvider>
  </BrowserRouter>
)
