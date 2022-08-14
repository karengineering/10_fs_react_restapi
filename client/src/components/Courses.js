import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

    const Courses = () => {
        const [ courses, setCourses ] = useState([]); 

        useEffect(() => {
            console.log('useEffect called');
            fetch('http://localhost:5000/api/courses')
                .then(res => res.json())
                .then(courses => console.log(courses))
                .then(courses => {setCourses(courses)})
                .catch(err => {
                    console.log('Error fetching and parsing data', err);
                });
        }, []);
    
    console.log('hi');
    console.log(courses);
 
    
    return (<h1>Hello</h1>);  
      
}

export default Courses;