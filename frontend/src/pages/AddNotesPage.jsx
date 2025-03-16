import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNotesCollection } from "../notescollection/note.js";
import { Logger } from "../utils/logger.js";

const AddNotesPage = () => {
  const [newNote, setNewNote] = useState({
    heading: "",
    description: "",
    image: "",
  });

  const { createNote } = useNotesCollection();

  const handleAddNote = async () => {
    Logger.log("Adding note:", newNote);
    const { success, message } = await createNote(newNote);
    Logger.log("Note created:", success, message);
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Add New Note
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Note Heading"
              name="heading"
              value={newNote.heading}
              onChange={(e) =>
                setNewNote({ ...newNote, heading: e.target.value })
              }
            />
            <Input
              placeholder="Note Description"
              name="description"
              value={newNote.description}
              onChange={(e) =>
                setNewNote({ ...newNote, description: e.target.value })
              }
            />
            <Input
              placeholder="Note Image URL"
              name="image"
              value={newNote.image}
              onChange={(e) =>
                setNewNote({ ...newNote, image: e.target.value })
              }
            />

            <Button colorScheme="purple" onClick={handleAddNote} w={"full"}>
              Add Note
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default AddNotesPage;