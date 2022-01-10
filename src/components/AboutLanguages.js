import React from 'react'

function AboutLanguages(props) {
    return (
            <div className=" p-10  m-auto">
                <div style={{height:"144px",width:"144px"}} className="flex-shrink-0 flex flex-col items-center text-center">
                    <img alt={props.langName} className="rounded-lg w-full h-56 object-fill object-center mb-4" src={props.src} />
                    <div className="w-full">
                        <h2 className="title-font font-bold text-lg text-gray-900">{props.langName}</h2>
                    </div>
                </div>
            </div>
    )
}

export default AboutLanguages
