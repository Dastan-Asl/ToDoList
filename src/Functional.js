import React, { useState } from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Button,
  Checkbox,
  Text,
} from "@chakra-ui/react";

const List = (props) => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const task = {
      text: value,
      completed: false,
    };

    const arr = [...tasks, task];
    setTasks(arr);
    setValue("");
  };

  const handleToggleTask = (e, index) => {
    const check = e.target.checked;
    const arr = [...tasks];
    arr[index].completed = check;
    setTasks(arr);
  };

  return (
    <Box p={20}>
      <VStack alignItems="stretch" spacing={5}>
        <Box borderWidth={1} p={5} borderRadius="lg">
          <FormControl id="todo">
            <FormLabel>What do you want to do?</FormLabel>
            <HStack>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Your next task..."
              />
              <Button disabled={value.length === 0} onClick={handleAddTask}>
                Submit
              </Button>
            </HStack>
          </FormControl>
        </Box>
        <Box borderWidth={1} p={5} borderRadius="lg" bg="gray.100">
          <VStack alignItems="stretch">
            {tasks.map((task, index) => {
              return (
                <Box
                  key={index}
                  borderWidth="1px"
                  backgroundColor="white"
                  borderRadius="lg"
                  p={3}
                >
                  <HStack spacing={3}>
                    <Checkbox
                      size="lg"
                      onChange={(e) => handleToggleTask(e, index)}
                    />
                    <Text
                      flex="1"
                      style={{
                        textDecoration: task.completed && "line-through",
                      }}
                      fontSize="lg"
                    >
                      {task.text}
                    </Text>
                  </HStack>
                </Box>
              );
            })}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default List;
