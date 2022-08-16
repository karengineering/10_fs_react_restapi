import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

//stateful component
/*
>provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course
>also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course
>also renders an "Update Course" button for navigating to the "Update Course" screen
*/
export default function CourseDetail() {
    const { id } = useParams();
    const [ course, setCourse ] = useState([]); 
    
    useEffect(() => {
        console.log('useEffect called');
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(({data: course}) => {
                console.log(course);
                setCourse(course);
            })
            .catch(err => {
                console.log('Error fetching and parsing data', err);
            });
    }, [id]);

    //     console.log('a')
    // }, []);


    //course-detail.html
    return (

        <h1>Hello {id}</h1>
    );
}