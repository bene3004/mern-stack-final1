import { Box, useColorModeValue } from "@chakra-ui/react";
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const AddNotesPage = lazy(() => import ('./pages/AddNotesPage'));
const LogInPage = lazy(() => import ('./pages/LogInPage'));
import MainPage from "./pages/MainPage";
import StatsPage from "./pages/StatsPage";
import Navbar from "./components/Navbar";
import { Suspense } from "react";


function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Suspense fallback={<div>Loading..</div>}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/create" element={<AddNotesPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
      </Suspense>
    </Box>
  );
}

export default App;