// components/PrivateRouteAdmin.jsx
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRouteAdmin({ children }) {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (usuario.tipo !== 'admin') {
    return <Navigate to="/perfil" />; // bloqueia usuário comum
  }

  return children;
}
