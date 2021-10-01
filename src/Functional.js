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
import { v4 as uuidv4 } from "uuid";

const List = (props) => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );

  const handleAddTask = () => {
    const task = {
      text: value,
      completed: false,
      id: uuidv4(),
    };

    const arr = [...tasks, task];
    setTasks(arr.sort(sortByCompleted));
    setValue("");
    localStorage.setItem("tasks", JSON.stringify(arr));
  };

  const handleDeleteTask = (id) => {
    const arr = [...tasks];
    const filtered = arr.filter((el) => el.id !== id);
    setTasks(filtered.sort(sortByCompleted));
    localStorage.setItem("tasks", JSON.stringify(filtered));
  };

  const handleToggleTask = (e, id) => {
    const check = e.target.checked;
    const arr = [...tasks];
    const index = arr.findIndex((el) => el.id === id);
    arr[index].completed = check;
    setTasks(arr.sort(sortByCompleted));
    localStorage.setItem("tasks", JSON.stringify(arr));
  };

  const sortByCompleted = (a, b) => {
    const sortArr = a.completed - b.completed;
    return sortArr;
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
            {tasks.map((task) => {
              return (
                <Box
                  key={task.id}
                  borderWidth="1px"
                  backgroundColor="white"
                  borderRadius="lg"
                  p={3}
                >
                  <HStack spacing={3}>
                    <Checkbox
                      size="lg"
                      onChange={(e) => handleToggleTask(e, task.id)}
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
                    <Button onClick={() => handleDeleteTask(task.id)}>
                      Delete task
                    </Button>
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
