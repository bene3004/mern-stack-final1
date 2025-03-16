import { useState } from "react";
import { Box, Button, Container, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:1001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast({ title: "Login erfolgreich!", status: "success", duration: 2000 });
        navigate("/");
      } else {
        toast({ title: data.message, status: "error", duration: 2000 });
      }
    } catch (error) {
      console.error("Fehler beim Login:", error);
      toast({ title: "Serverfehler!", status: "error", duration: 2000 });
    }
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading>Login</Heading>
        <Box w="full" p={6} boxShadow="md" rounded="lg">
          <VStack spacing={4}>
            <Input placeholder="E-Mail" name="email" value={formData.email} onChange={handleChange} />
            <Input placeholder="Passwort" type="password" name="password" value={formData.password} onChange={handleChange} />
            <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default LogInPage;
