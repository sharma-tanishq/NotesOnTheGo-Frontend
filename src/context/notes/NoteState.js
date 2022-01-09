import NoteContext from "./noteContext";
import { useState } from "react";
import { toast } from "react-toastify";


const NoteState = (props) => {

    const [notes, setNotes] = useState([]);


    //get all notes
    const getAllNotes = async () => {

        //api call
        const response = await fetch('https://notes-on-the-go-api.herokuapp.com/api/notes/getnotes', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth_token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        setNotes(json.notes);
        // error handling
        if (json.success) {
            return json
        }
        else {
            toast.warn("Unable to save/retrieve notes from server", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, })
            return json;
        }
    }



    //add a note

    const addNote = async (title, description, tag) => {

        //api call
        const response = await fetch('https://notes-on-the-go-api.herokuapp.com/api/notes/createnotes', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth_token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "title": title,
                "tag": tag,
                "description": description
            }) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        //error handling
        if (json.success) {

            toast.success("Note Added Successfully", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, })

            if (json.note._id) setNotes(notes.concat(json.note));

        }

        else { toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }

    }


    // delete a note

    const deleteNote = async (id) => {
        //api call
        const response = await fetch(`https://notes-on-the-go-api.herokuapp.com/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth_token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const json = await response.json(); //json returns success

        //error handling
        if (json.success) {
            toast.success("Note deleted Successfully", {position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, })
            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes);
        }
        else {
            toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, })
        }
        return json;
    }


    // edit a note

    const updateNote = async (id, title, description, tag) => {
        console.log("editing note");
        //api call
        const response = await fetch(`https://notes-on-the-go-api.herokuapp.com/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth_token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "title": title,
                "tag": tag,
                "description": description
            }) // body data type must match "Content-Type" header
        });
        const json = await response.json(); //json return success on 
        //error handling 
        if (json.success) {
            
            toast.success("Note Updated Successfully", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, })
            
            let newNotes = JSON.parse(JSON.stringify(notes))
            
            for (let i = 0; i < newNotes.length; i++) {
                if (newNotes[i]._id === id) {
                    newNotes[i].title = title;
                    newNotes[i].description = description;
                    newNotes[i].tag = tag;
                }
            }
            setNotes(newNotes);
        }

        else {toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, })}

        return json;
    }

    
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;

