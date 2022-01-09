import React, { useContext, useState } from 'react'
import {ToastContainer } from 'react-toastify';
import noteContext from '../context/notes/noteContext'
import 'react-toastify/dist/ReactToastify.css';


function NoteItem(props) {
    const [isEditing, setIsEditing] = useState(false)
    const { note } = props
    const [newNoteEdit, setNewNoteEdit] = useState(note);
    const { deleteNote, updateNote } = useContext(noteContext);


    const handleNoteItemDelete = () => {
       deleteNote(note._id);

    }

    const handleNoteItemEdit = () => {
        setIsEditing(!isEditing);
    }
    
    const handleEditNoteSubmit = (e) => {
        e.preventDefault();
        updateNote(note._id, newNoteEdit.title, newNoteEdit.description, newNoteEdit.tag)
        setIsEditing(!isEditing);
    }

    const onChange = (e) => {
        setNewNoteEdit({ ...newNoteEdit, [e.target.id]: e.target.value })
    }

    return (
        <>


            <div className={`${isEditing ? "hidden" : ""} p-4 xl:w-1/4 md:w-1/2 w-full relative`}>
                <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden max-w-md">
                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{note.tag}</h2>
                    <h1 className="text-2xl text-gray-900 pb-4 mb-4 border-b border-gray-300 leading-none">{note.title}</h1>
                    <p className="flex items-center pb-2 text-gray-600 mb-2">
                        {note.description}
                    </p>
                    <div className='patanhi'>

                        <div className='flex absolute bottom-0 left-2'>
                            {/* edit button*/}
                            <button onClick={handleNoteItemEdit} className="flex items-center mt-auto w-fit border-0 py-2 px-4  focus:outline-none hover:text-yellow-500 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                            {/* edit button end*/}

                            {/* delete button */}
                            <button onClick={handleNoteItemDelete} className="flex items-center mt-auto w-fit border-0 py-2 px-4  focus:outline-none hover:text-yellow-500 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {/* delete button end*/}
                        </div>

                    </div>
                </div>
            </div>

            <div className={`${isEditing ? "" : "hidden"}`}>
                <div className="p-4  w-full bg relative">
                    <form >
                        <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden max-w-md">
                            <h2 className="text-sm tracking-widest title-font mb-1 font-medium"><input onChange={onChange} type="text" id='tag' className=' bg-transparent outline-none' placeholder='general' defaultValue={note.tag}/></h2>
                            <h1 className="text-2xl text-gray-900 pb-4 mb-4 border-b border-gray-300 leading-none"><input onChange={onChange} className=' bg-transparent outline-none' type="text" id='title' placeholder='Document Title' defaultValue={note.title} /></h1>
                            <p className="flex items-center pb-2 text-gray-600 mb-2">
                                <textarea onChange={onChange} className=' bg-transparent outline-none' name="description" id="description" cols="30" rows="4" defaultValue={note.description}></textarea>
                            </p>

                            {/* close button */}

                            <div className='flex absolute top-0 right-0 hover:cursor-pointer p-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() =>setIsEditing(!isEditing)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>

                            {/* close button end */}

                            <div className='flex justify-between '>

                                {/* delete button */}
                                <button type="reset" className="flex items-center mt-auto w-fit border-0 py-2 px-4  focus:outline-none hover:text-yellow-500 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {/* delete button end*/}

                                <button onClick={handleEditNoteSubmit} className="flex items-center mt-auto w-fit border-0 py-1 mb-0 px-4  focus:outline-none hover:text-yellow-500 rounded">
                                    <input type="submit" className=' font-bold' value="Submit"  />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer/>
        </>
    )
}

export default NoteItem
