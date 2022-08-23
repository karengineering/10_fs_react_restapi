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
    // use state accepts 1 optional arg, the initial value of the state var
    //calling useState() w/ the initial state returns an arr w/ 2 values:
        //1st is var w/ current state value...similar to this.state 
        //2nd is fcn to update that value...similar to this.setState()
    //when working w/ React Hooks, use destructuring assignment syntax to assign each returned value to a distinct var
    const [ courses, setCourses ] = useState([]); 

    //the effect happens after the render
    useEffect(() => {
        // console.log('useEffect called');
        axios.get('http://localhost:5000/api/courses')
            .then(courses => {
                setCourses(courses.data)
            })
            .catch(err => {
                console.log('Error fetching and parsing data', err);
            });
    }, []);
    // ^^^ optional arr as 2nd arg that instructs React to skip applying an effect(re-rendering) if specific values havent changed b/w re-renders
    //since no dependencies here, passing empty arr as 2nd arg will run useEffect only once after initial render

    //mimics index.html
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