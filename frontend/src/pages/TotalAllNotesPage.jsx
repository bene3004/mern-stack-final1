import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Logger } from "../utils/logger";

const TotalAllNotesPage = () => {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        Logger.log("Fetching total notes count");
        const res = await fetch("/api/notes/total");
        const data = await res.json();
        if (data.success) {
          setTotal(data.total);
          Logger.log("Total notes fetched:", data.total);
        } else {
          Logger.log("Failed to fetch total notes:", data.message);
        }
      } catch (error) {
        Logger.log("Error fetching total notes:", error);
      }
    };

    fetchTotal();
  }, []);

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Total Notes
        </Heading>
        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <Text fontSize="lg">
            {total !== null
              ? `There are ${total} notes in the database.`
              : "Loading total notes..."}
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default TotalAllNotesPage;