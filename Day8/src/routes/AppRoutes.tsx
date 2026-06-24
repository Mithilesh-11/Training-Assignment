import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ContactsPage from "../pages/ContactsPage";
import LoginPage from "../pages/LoginPage";
import ErrorBoundary from "../components/ErrorBoundary";
import withAuth from "../hoc/withAuth";

const ProtectedContacts = withAuth(ContactsPage);

function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/contacts"
        element={
          <ErrorBoundary>
            <ProtectedContacts />
          </ErrorBoundary>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;