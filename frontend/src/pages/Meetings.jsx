import { useEffect, useState } from "react";
import {
  getMeetings,
  createMeeting,
  deleteMeeting,
  updateMeeting,
} from "../services/meetingService";
import "../styles/Employees.css";

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingMeetingId, setEditingMeetingId] = useState(null);
  const role = localStorage.getItem("role");
  const isHR = role === "HR";
  useEffect(() => {
    async function loadMeetings() {
      try {
        const data = await getMeetings();
        setMeetings(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadMeetings();
  }, []);

  async function handleSaveMeeting(event) {
    event.preventDefault();

    try {
      const meetingData = {
        title: title,
        description: description,
        date: date,
        location: location,
      };

      if (editingMeetingId) {
        await updateMeeting(editingMeetingId, meetingData);

        const updatedMeetings = meetings.map((meeting) =>
          meeting.id === editingMeetingId
            ? { ...meeting, ...meetingData }
            : meeting,
        );

        setMeetings(updatedMeetings);
      } else {
        const createdMeeting = await createMeeting(meetingData);

        setMeetings([...meetings, createdMeeting]);
      }

      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setEditingMeetingId(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEditMeeting(meeting) {
    setEditingMeetingId(meeting.id);
    setTitle(meeting.title);
    setDescription(meeting.description);

    setDate(meeting.date.slice(0, 16));

    setLocation(meeting.location);

    setShowForm(true);
  }

  async function handleDeleteMeeting(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this meeting?",
    );
    if (!confirm) {
      return;
    }
    try {
      await deleteMeeting(id);
      setMeetings(meetings.filter((meeting) => meeting.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="employees-page">
      <div className="employees-card">
        <div className="employees-header">
          <div>
            <h1>Meetings</h1>
            <p>Schedule and manage onboarding meetings.</p>
          </div>

          {isHR && (
            <button
              className="add-employee-button"
              type="button"
              onClick={() => {
                setEditingMeetingId(null);
                setTitle("");
                setDescription("");
                setDate("");
                setLocation("");
                setShowForm(true);
              }}
            >
              + Add Meeting
            </button>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="employees-list">
          {meetings.map((meeting) => (
            <div className="employee-row" key={meeting.id}>
              <div className="employee-avatar">📅</div>

              <div className="employee-details">
                <h3>{meeting.title}</h3>
                <p>{meeting.description}</p>
                <p>{meeting.location}</p>
              </div>

              <span className="employee-status">
                {new Date(meeting.date).toLocaleDateString()}
              </span>

              {isHR && (
                <>
                  <button
                    className="edit-button"
                    type="button"
                    onClick={() => handleEditMeeting(meeting)}
                  >
                    ✏️
                  </button>

                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => handleDeleteMeeting(meeting.id)}
                  >
                    🗑
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {showForm && isHR && (
          <div className="modal-background">
            <div className="modal">
              <div className="modal-header">
                <h2>{editingMeetingId ? "Edit Meeting" : "Add Meeting"}</h2>

                <button
                  className="close-button"
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingMeetingId(null);
                    setTitle("");
                    setDescription("");
                    setDate("");
                    setLocation("");
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSaveMeeting} className="task-form">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />

                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />

                <label>Date</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />

                <label>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  required
                />

                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingMeetingId(null);
                      setTitle("");
                      setDescription("");
                      setDate("");
                      setLocation("");
                    }}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-button">
                    {editingMeetingId ? "Save Changes" : "Save Meeting"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Meetings;
