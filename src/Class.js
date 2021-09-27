import React from "react";
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

class List extends React.Component {
  state = {
    value: "",
    tasks: [],
  };

  handleAddTask = () => {
    const task = {
      text: this.state.value,
      completed: false,
    };
    const arr = [...this.state.tasks, task];
    this.setState({ tasks: arr, value: "" });
  };

  handleToggleTask = (e, index) => {
    const check = e.target.checked;
    const arr = [...this.state.tasks];
    arr[index].completed = check;
    this.setState({ tasks: arr });
  };

  render() {
    return (
      <Box p={20}>
        <VStack alignItems="stretch" spacing={5}>
          <Box borderWidth={1} p={5} borderRadius="lg">
            <FormControl id="todo">
              <FormLabel>What do you want to do?</FormLabel>
              <HStack>
                <Input
                  value={this.state.value}
                  onChange={(e) => this.setState({ value: e.target.value })}
                  placeholder="Your next task..."
                />
                <Button
                  disabled={this.state.value.length === 0}
                  onClick={this.handleAddTask}
                >
                  Submit
                </Button>
              </HStack>
            </FormControl>
          </Box>
          <Box borderWidth={1} p={5} borderRadius="lg" bg="gray.100">
            <VStack alignItems="stretch">
              {this.state.tasks.map((task, index) => {
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
                        onChange={(e) => this.handleToggleTask(e, index)}
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
  }
}

export default List;
