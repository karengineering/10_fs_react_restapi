import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
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

    // console.log(course.user.firstName);

    //     console.log('a')
    // }, []);


    //course-detail.html
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <React.Fragment>
                        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                        <Link className="button" to="#">Delete Course</Link>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </React.Fragment>
                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.user.firstName} {course.user.lastName}</p>
                            <ReactMarkdown>{course.description}</ReactMarkdown>                         
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
    // return (<h1>Hello</h1>);
}