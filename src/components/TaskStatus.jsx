import React, { useMemo } from "react";
import { useTask } from "../context/task/useTask";

const TaskStatus = () => {
  const { tasks } = useTask();

  const statusCount = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      {
        Pending: 0,
        "In Progress": 0,
        Completed: 0,
      },
    );
  }, [tasks]);

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card text-center border-warning">
          <div className="card-body">
            <h6 className="text-warning">Pending</h6>
            <h3>{statusCount.Pending}</h3>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center border-primary">
          <div className="card-body">
            <h6 className="text-primary">In Progress</h6>
            <h3>{statusCount["In Progress"]}</h3>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center border-success">
          <div className="card-body">
            <h6 className="text-success">Completed</h6>
            <h3>{statusCount.Completed}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
