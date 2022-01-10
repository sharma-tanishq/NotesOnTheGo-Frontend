import React from 'react'
import AboutLanguages from './AboutLanguages'

function About() {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">ABOUT ME</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hello, I am Tanishq Sharma a software and web develpoer specializing in data structure and algorithims and MERN stack. I have 2 years of experience in building web apps and softwares. Feel free to contact via email : <div className=' text-yellow-600 font-bold'>sharma.tanishq9999@gmail.com</div> </p>
                    </div>
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">LANGUAGES</h1>
                    </div>
                    <div className="flex flex-wrap -m-4">
                    <AboutLanguages src={"langIcons/c.png"} langName={"C"}/>
                    <AboutLanguages src={"langIcons/cpp.png"} langName={"C++"}/>
                    <AboutLanguages src={"langIcons/html.png"} langName={"HTML 5"}/>
                    <AboutLanguages src={"langIcons/js.png"} langName={"JAVASCRIPT"}/>
                    <AboutLanguages src={"langIcons/py.png"} langName={"PYTHON"}/>
                    <AboutLanguages src={"langIcons/react.png"} langName={"REACT"}/>
                    <AboutLanguages src={"langIcons/nodejs.png"} langName={"NODE JS"}/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About