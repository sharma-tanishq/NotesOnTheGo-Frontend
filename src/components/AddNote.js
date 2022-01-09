import React, { useContext, useState,useRef } from 'react'
import { toast} from 'react-toastify';
import noteContext from '../context/notes/noteContext'
import 'react-toastify/dist/ReactToastify.css';
function AddNote(props) {

    const context = useContext(noteContext);

    const { addNote } = context;

    const clearButton = useRef(null)

    // SIMPLY A NOTE STATE TO MANAGE INPUT FIELDS
    const [note, setnote] = useState({ title: "", description: "", tag: "general" })

    const onChange = (e) => {
        setnote({ ...note, [e.target.id]: e.target.value })
    }

    const handleAddNoteSubmit = async (e) => {
        e.preventDefault();
        if(note.title.length<1){ return toast.warn("Title cannot be blank", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        
        // api call
        addNote(note.title, note.description, note.tag);
        props.setAddNoteVisible(!props.addNoteVisible);
        clearButton.current.click();
    }

    return (
        <div className="p-4  w-full bg relative">
            <form >
                <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden max-w-md">
                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium"><input onChange={onChange} type="text" id='tag' className=' bg-transparent outline-none' defaultValue='general' /></h2>
                    <h1 className="text-2xl text-gray-900 pb-4 mb-4 border-b border-gray-300 leading-none"><input onChange={onChange} className=' bg-transparent outline-none' type="text" id='title' required={true} placeholder='Document Title' /></h1>
                    <p className="flex items-center pb-2 text-gray-600 mb-2">
                        <textarea onChange={onChange} className=' bg-transparent outline-none' name="description" id="description" cols="30" rows="4" placeholder='type your notes here'></textarea>
                    </p>

                    {/* close button */}

                    <div className='flex absolute top-0 right-0 hover:cursor-pointer p-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => props.setAddNoteVisible(!props.addNoteVisible)} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* close button end */}

                    <div className='flex justify-between '>

                        {/* delete button */}
                        <button ref={clearButton} type="reset" onClick={()=>{setnote({ title: "", description: "", tag: "general" })}} className="flex items-center mt-auto w-fit border-0 py-2 px-4  focus:outline-none hover:text-yellow-500 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {/* delete button end*/}

                        <button className="flex items-center mt-auto w-fit border-0 py-1 mb-0 px-4  focus:outline-none hover:text-yellow-500 rounded">
                            <input type="submit" className=' font-bold' value="Submit" onClick={handleAddNoteSubmit} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddNote
