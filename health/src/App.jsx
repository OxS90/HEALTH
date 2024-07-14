import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useAuth } from './hooks/useAuth.js';
import Loader from './components/loader.jsx';
import { refreshUserToken, getCurrentUser } from './redux/auth/operations.js';
import Layout from './components/Layout/Layout.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';

const CalculatorPageLazy = lazy(() => import('./pages/CalculatorPage/Calculator.jsx'));
const RegisterPageLazy = lazy(() => import('./pages/RegistrationPage/Registration.jsx'));
const LoginPageLazy = lazy(() => import('./pages/LogInPage/LogIn.jsx'));
const MainPageLazy = lazy(() => import('./pages/MainPage/Main.jsx'));
const DiaryPageLazy = lazy(() => import('./pages/DiaryPage/Diary.jsx'));
const PageNotFound = lazy(() => import('./pages/NotFound.jsx'));

export const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isRefreshing, token } = useAuth();

  useEffect(() => {
    console.log("Initial token check:", token);
    if (!isLoggedIn && token) {
      console.log("Dispatching refreshUserToken");
      dispatch(refreshUserToken());
    }
  }, [dispatch, isLoggedIn, token]);

  useEffect(() => {
    dispatch(refreshUserToken());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Fetching current user data");
      dispatch(getCurrentUser());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Router>
      <Layout />
      {isRefreshing ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute redirectPath="/login">
                  <MainPageLazy />
                </PublicRoute>
              }
            />
            <Route
              path="/calculator"
              element={
                <PrivateRoute redirectPath="/login">
                  <CalculatorPageLazy />
                </PrivateRoute>
              }
            />
            <Route
              path="/diary"
              element={
                <PrivateRoute redirectPath="/login">
                  <DiaryPageLazy />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute redirectPath="/calculator">
                  <LoginPageLazy />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute redirectPath="/calculator">
                  <RegisterPageLazy />
                </PublicRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            closeOnClick
            theme="colored"
          />
        </Suspense>
      )}
    </Router>
  );
};

export default App;





