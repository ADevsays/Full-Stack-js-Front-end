import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPass from './pages/ForgetPass';
import Confirm from './pages/Confirm';
import NewPassword from './pages/newPassword';
import { AuthProvider } from './context/AuthProvider';
import { PacientsProvider } from './context/PacientsProvider';
import ProtectedRoute from './layout/ProtectedRoute';
import AdminPacients from './pages/AdminPacients';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <div>
      <AuthProvider>
        <PacientsProvider>
          <Routes>
            
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Register />} />
              <Route path='recuperar-password' element={<ForgetPass />} />
              <Route path='recuperar-password/:token' element={<NewPassword />} />
              <Route path='confirmar/:id' element={<Confirm />} />
            </Route>

            <Route path='/admin' element={<ProtectedRoute />}>
              <Route index element={<AdminPacients />} />
              <Route path='perfil' element={<EditProfile />} />
              <Route path='cambiar-password' element={<ChangePassword />} />
            </Route>

          </Routes>
        </PacientsProvider>
      </AuthProvider>
    </div>
  )
}

export default App
