import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Notes() {

    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getAllNotes } = context;
    let [addNoteVisible, setAddNoteVisible] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('auth_token')){
            getAllNotes();
        } 
        else {navigate('/login');}
    },[])

    return (
        <div className=''>
            <div className='flex justify-center my-5'>
                <h1 className='font-bold text-xl'>Your Notes</h1>
            </div>

            {/* Add Note Button */}

            <div className='flex justify-center'>
                <button onClick={() => { setAddNoteVisible(addNoteVisible = !addNoteVisible) }} className="flex items-center mt-auto w-fit border-0 py-2 px-4 focus:outline-none hover:text-yellow-500 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className=" h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Add Note Button End */}

            {/* add Note */}
            <div className='flex justify-center'>
                <div className={`${addNoteVisible ? "" : "hidden"}`}>
                    <AddNote addNoteVisible={addNoteVisible} setAddNoteVisible={setAddNoteVisible} />
                </div>
            </div>

            {/* add Note End */}

            {/* Note */}

            <div className='flex justify-center flex-wrap'>
                {
                    notes.map((note) => { return <NoteItem key={note._id} note={note} /> })
                }
            </div>
            {/* Note End */}

        <ToastContainer/>
        </div>
    )
}

export default Notes
