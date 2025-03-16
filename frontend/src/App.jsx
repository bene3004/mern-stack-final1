import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import AddNotesPage from "./pages/AddNotesPage";
import MainPage from "./pages/MainPage";
import LogInPage from "./pages/LogInPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/create" element={<AddNotesPage />} />
      </Routes>
    </Box>
  );
}

export default App;