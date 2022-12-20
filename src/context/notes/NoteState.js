import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3MzY0MTA0ZDU2MjY2YmY2YzFjZGI5In0sImlhdCI6MTY2ODUyODg3NH0.vNqZ9KVxP6FGNtqMjvV7QoYp1wgfTH12HvNkMhPjpB4",
      }
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };

  //Add note
  const addNote = async (title, description, tag) => {
    //API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3MzY0MTA0ZDU2MjY2YmY2YzFjZGI5In0sImlhdCI6MTY2ODUyODg3NH0.vNqZ9KVxP6FGNtqMjvV7QoYp1wgfTH12HvNkMhPjpB4",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //logic
    const note = {
      _id: "637b5efec3a84c05c4644ae782",
      user: "637364104d56266bf6c1cdb9",
      title: title,
      description: description,
      tag: tag,
      date: "1669029630720",
      __v: 0,
    };
    setnotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3MzY0MTA0ZDU2MjY2YmY2YzFjZGI5In0sImlhdCI6MTY2ODUyODg3NH0.vNqZ9KVxP6FGNtqMjvV7QoYp1wgfTH12HvNkMhPjpB4",
      }
    });
    const json = response.json();
    console.log(json);


    //logic
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3MzY0MTA0ZDU2MjY2YmY2YzFjZGI5In0sImlhdCI6MTY2ODUyODg3NH0.vNqZ9KVxP6FGNtqMjvV7QoYp1wgfTH12HvNkMhPjpB4",
      },
      // eslint-disable-next-line
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const json = response.json();

    // logic for edit
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
      }
      if (element._id === id) {
        element.description = description;
      }
      if (element._id === id) {
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
