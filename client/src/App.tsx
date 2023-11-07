import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import AuthProvider, { RequireAuth } from "./contexts/AuthProvider";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Login from "./pages/login";
import Register from "./pages/register";
import Create from "./components/create";
import Chart from "./pages/chart";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <RecordList />
            </RequireAuth>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <RequireAuth>
              <Edit />
            </RequireAuth>
          }
        />
        <Route
          path="/chart"
          element={
            <RequireAuth>
              <Chart />
            </RequireAuth>
          }
        />
        <Route
          path="/create"
          element={
            <RequireAuth>
              <Create />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
