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
import { v4 as uuidv4 } from "uuid";

class List extends React.Component {
  state = {
    value: "",
    tasks: [],
  };

  handleAddTask = () => {
    const task = {
      text: this.state.value,
      completed: false,
      id: uuidv4(),
    };
    const arr = [...this.state.tasks, task];
    this.setState({ tasks: arr.sort(this.sortByCompleted), value: "" });
  };

  handleDeleteTask = (id) => {
    const arr = [...this.state.tasks];
    const filtered = arr.filter((el) => el.id !== id);
    this.setState({ tasks: filtered.sort(this.sortByCompleted) });
  };

  handleToggleTask = (e, id) => {
    const check = e.target.checked;
    const arr = [...this.state.tasks];
    const index = arr.findIndex((el) => el.id === id);
    arr[index].completed = check;
    this.setState({ tasks: arr.sort(this.sortByCompleted) });
  };

  sortByCompleted = (a, b) => {
    const sortArr = a.completed - b.completed;
    return sortArr;
  };

  componentDidMount() {
    this.setState({ tasks: JSON.parse(localStorage.getItem("tasks")) });
  }

  componentDidUpdate() {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }

  render() {
    return (
      <Box p={20}>
        <VStack alignItems="stretch" spacing={5}>
          <Box borderWidth={1} p={5} borderRadius="lg">
            <FormControl id="todo">
              <FormLabel>Что вы хотите сделать?</FormLabel>
              <HStack>
                <Input
                  value={this.state.value}
                  onChange={(e) => this.setState({ value: e.target.value })}
                  placeholder="Ваша следующая задача..."
                />
                <Button
                  disabled={this.state.value.length === 0}
                  onClick={this.handleAddTask}
                >
                  Добавить
                </Button>
              </HStack>
            </FormControl>
          </Box>
          <Box borderWidth={1} p={5} borderRadius="lg" bg="gray.100">
            <VStack alignItems="stretch">
              {this.state.tasks.map((task) => {
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
                        onChange={(e) => this.handleToggleTask(e, task.id)}
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
                      <Button onClick={() => this.handleDeleteTask(task.id)}>
                        Удалить
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
  }
}

export default List;
