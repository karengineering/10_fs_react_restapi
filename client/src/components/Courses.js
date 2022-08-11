
//stateful component
/*
>provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses
>Each course needs to link to its respective "Course Detail" screen. This component also renders a link to the "Create Course" screen
*/

//React Hooks: useState, useEffect
import React, { useState, useEffect } from 'react';

const Courses = () => {
    // use state accepts 1 optional arg, the initial value of the state var
    //initial state of courses is 0
    //calling useState() w/ the initial state returns an arr w/ 2 values:
        //1st is var w/ current state value (0 here)...similar to this.state 
        //2nd is fcn to update that value...similar to this.setState()
    //when working w/ React Hooks, use destructuring assignment syntax to assign each returned value to a distinct var
    const [ courses, setCourses ] = useState(0); // [0, f]

    //the effect happens after the render
    useEffect(() => {
        console.log('useEffect called');
        fetch('')
    }, []);
    // ^^^ optional arr as 2nd arg that instructs React to skip applying an effect(re-rendering) if specific values havent changed b/w re-renders
    //since no dependencies here, passing empty arr as 2nd arg will run useEffect only once after initial render
    
    return (
        f
    );
}

export default Courses;