import React, { useState } from "react";
import Button from "../../UI/Button";
import EditUserProject from "./EditUserProject";

export default function UserProjects({ projects }) {
  const [index, setIndex] = useState(null);

  const [tasks, setTasks] = useState([
    { employee: "Sairaj Rajput", tasks: [{ name: "Develop Backend", status: "inprogress" },{ name: "Join intership", status: "completed" },{ name: "Stalk her", status: "inprogress" }] },
  ]);

  const handleStatusChange = (taskIndex, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[0].tasks[taskIndex].status = newStatus; // Assuming a single user (Sairaj) for simplicity
    setTasks(updatedTasks);
  };

  let content = null;
  let heading = null;
  if (index !== null) {
    heading = <h1>Project Board</h1>;
    content = (
      <EditUserProject
        tasks={tasks[0].tasks}
        onStatusChange={handleStatusChange}
        onBack={() => setIndex(null)}
      />
    );
  } else {
    heading = <h1>Your Projects</h1>;
    content = projects.map((user, idx) => (
      <div className="project" key={idx}>
        <label>Project Name: {user.name}</label>
        <label>
          Project Status:
          <p className={`status ${user.ProjectStatus.toLowerCase()}`}>
            {user.ProjectStatus}
          </p>
        </label>
        <label>Assigned Date: {user.Starting_Date}</label>
        <Button
          className="edit-project-button"
          onSubmit={() => setIndex(idx)}
        >
          Edit Project
        </Button>
      </div>
    ));
  }

  return (
    <>
      {heading}
      <div className="admin-projects">{content}</div>
    </>
  );
}
