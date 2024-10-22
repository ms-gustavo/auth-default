import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthContext, { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import ProtectedPage from "./pages/ProtectedPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmRegisterPage from "./pages/ConfirmRegisterPage";
import ProviderCallbackPage from "./components/ProvidersComponents/ProviderCallbackPage";
import { Toaster } from "react-hot-toast";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useContext(AuthContext);
  return token ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/confirm/:confirmId" element={<ConfirmRegisterPage />} />
          <Route
            path="/auth/google/callback"
            element={<ProviderCallbackPage />}
          />
          <Route
            path="/auth/github/callback"
            element={<ProviderCallbackPage />}
          />
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <ProtectedPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
