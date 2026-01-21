import React, { useState } from "react";
import { initialTasks } from "../../data/tasks";
import { TaskContext } from "./TaskContext";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

