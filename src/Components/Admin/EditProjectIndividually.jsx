import React, { useState } from "react";
import "./EditProjectIndividually.css";

export default function EditProjectIndividually({ data }) {
  const [projectData, setProjectData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  // Toggle editing mode
  const toggleEditing = () => setIsEditing(!isEditing);

  // Remove a user from the project
  const handleRemoveUser = (userIndex) => {
    const updatedUsers = [...projectData.user];
    updatedUsers.splice(userIndex, 1); // Remove user
    setProjectData({ ...projectData, user: updatedUsers });
  };

  return (
    <div className="project-container">
      <h2 className="project-title">{projectData.name}</h2>

      <div className="project-details">
        <label className="label">Project Name:</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={projectData.name}
            onChange={handleChange}
            className="input-field"
          />
        ) : (
          <p className="detail">{projectData.name}</p>
        )}

        <label className="label">Project Description:</label>
        {isEditing ? (
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
            className="textarea-field"
          ></textarea>
        ) : (
          <p className="description">{projectData.description}</p>
        )}

        <label className="label">Start Date:</label>
        {isEditing ? (
          <input
            type="date"
            name="Starting_Date"
            value={projectData.Starting_Date}
            onChange={handleChange}
            className="input-field"
          />
        ) : (
          <p className="detail">{projectData.Starting_Date}</p>
        )}

        <label className="label">End Date:</label>
        {isEditing ? (
          <input
            type="date"
            name="Ending_Date"
            value={projectData.Ending_Date}
            onChange={handleChange}
            className="input-field"
          />
        ) : (
          <p className="detail">{projectData.Ending_Date}</p>
        )}

        <label className="label">Project Manager:</label>
        {isEditing ? (
          <input
            type="text"
            name="Project_Manager"
            value={projectData.Project_Manager}
            onChange={handleChange}
            className="input-field"
          />
        ) : (
          <p className="detail">{projectData.Project_Manager}</p>
        )}

        <label className="label">Project Status:</label>
        {isEditing ? (
          <select
            name="ProjectStatus"
            value={projectData.ProjectStatus}
            onChange={handleChange}
            className="dropdown"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        ) : (
          <p className={`status ${projectData.ProjectStatus.toLowerCase()}`}>
            {projectData.ProjectStatus}
          </p>
        )}

        {/* Display User Progress */}
        <h3 className="user-progress-title">User Progress</h3>
        <div className="user-list">
          {projectData.user && projectData.user.length > 0 ? (
            projectData.user.map((user, userIndex) =>{ 
            console.log(user);
            return (
              <div key={userIndex} className="user-item">
                {/* Display User Name */}
                <span className="user-name">{user.user_name}</span>

                {/* Display Progress Bar */}
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: user.progress }}
                  ></div>
                  <span className="progress-label">{user.progress}</span>
                </div>

                {/* Remove User Button (Visible Only in Editing Mode) */}
                {isEditing && (
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveUser(userIndex)}
                  >
                    Remove
                  </button>
                )}
              </div>
            )})
          ) : (
            <p className="no-users">No users assigned to this project.</p>
          )}
        </div>


        {/* Action Buttons */}
        <div className="buttons">
          <button onClick={toggleEditing} className="button">
            {isEditing ? "Save Changes" : "Edit"}
          </button>
          {isEditing && (
            <button onClick={() => setProjectData(data)} className="button cancel">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
