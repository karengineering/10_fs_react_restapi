import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

//stateful component
/*
>provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course
>also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course
>also renders an "Update Course" button for navigating to the "Update Course" screen
*/
export default function CourseDetail() {
    let history = useHistory();
    let context = useContext(Context);
    const { id } = useParams();
    const [ course, setCourse ] = useState(
        {
        id: "",
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        user: {
            id: "",
            firstName: "",
            lastName: ""
        },
    }); 
    const authUser = context.authenticatedUser;

    useEffect(() => {
        // console.log('CourseDetail useEffect called');
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(course => {
                // console.log(courses)
                setCourse(course.data)
            })
            .catch(err => {
                console.log('Error fetching and parsing data', err);
            });
    }, [id]);

    //function that allows authenticated and authorized user to delete a course
    function delCourse() {
        let emailAddress = authUser.emailAddress;
        let password = authUser.password;

        context.data.deleteCourse(id, emailAddress, password)
            .then( errors => {
                if(errors) {
                    console.log(`Course not deleted: ${errors}`);
                } else {
                    console.log('Course deleted');
                    history.push('/');    
                }
            })
            .catch((err) => {
              console.log(err);
              history.push('/error');
            });
    }

    //mimics course-detail.html
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                {/* if theres an authenticated user and their user id matches that of the user who owns the course, 
                render the Update and Delete course btns,
                else show the Return to List btn */}
                {(authUser && authUser.id === course.userId) 
                                    ?
                    (<React.Fragment>
                        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                        {/* <Link className="button" to="button" onClick={(delCourse)}>Delete Course</Link> */}
                        <button className="button" onClick={(delCourse)}>Delete Course</button>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </React.Fragment>
                    ):
                    <Link className="button button-secondary" to="/">Return to List</Link>
                }
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