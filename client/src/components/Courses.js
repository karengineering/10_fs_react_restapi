import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//stateful component
/*
>provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses
>Each course needs to link to its respective "Course Detail" screen. This component also renders a link to the "Create Course" screen
*/

//React Hooks: useState, useEffect
export default function Courses() {
    const [ courses, setCourses ] = useState([]); 

    useEffect(() => {
        console.log('useEffect called');
        // fetch('http://localhost:5000/api/courses')
        axios.get('http://localhost:5000/api/courses')
            // .then(res => res.json())
            .then(courses => {
                // console.log(courses)
                setCourses(courses.data)
            })
            // .then(courses => {setCourses(courses.data)})
            // .then(courses => console.log(courses))
            .catch(err => {
                console.log('Error fetching and parsing data', err);
            });
    }, []);

// console.log('hi');
// console.log(courses);

    //index.html
    //course detail, create courses
    return (
        <main>
            <div className="wrap main--grid">
                {courses.map(course => {
                    return (
                    <Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </Link>
                    );
                })}

                <Link className="course--module course--add--module" to="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        </main>
    );


// return (<h1>Hello</h1>);  
    
}