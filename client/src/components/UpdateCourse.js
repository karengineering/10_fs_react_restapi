import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Context } from '../Context';
import Form from './Form';
import axios from 'axios';

/*
This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. 
The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. 
This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.
*/
export default function UpdateCourse() {
    let history = useHistory();
    let context = useContext(Context);
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    const authUser = context.authenticatedUser;

    useEffect(() => {
        console.log('UpdateCourse useEffect called');
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(course => {
                setTitle(course.data.title);
                setDescription(course.data.description);
                setEstimatedTime(course.data.estimatedTime);
                setMaterialsNeeded(course.data.materialsNeeded);
                // console.log(course.data);
            })
            .catch(err => {
                console.log('Error fetching and parsing data', err);
            });
    }, [id, history]);

    return (
        <main>
        <div className="wrap">
            <h2>Update Course</h2>
            <Form 
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Update Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={change} />
                                    <p>By {authUser.firstName} {authUser.lastName}</p>

                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea id="courseDescription" name="courseDescription" type="text" value={description} onChange={change}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={change} />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={change}></textarea>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
            />
        </div>
    </main>
    );

        function cancel() {
            history.push('/');
        }
    
        function change(event) {
            const name = event.target.name;
            const value = event.target.value;
            
            if(name === "courseTitle") {
                setTitle(value);
            } else if (name === "courseDescription") {
                setDescription(value);
            } else if (name === "estimatedTime") {
                setEstimatedTime(value);
            } else if (name === "materialsNeeded") {
                setMaterialsNeeded(value);
            } else {
                return;
            }
            }
            
        function submit() {
            const userId = authUser.id;
            const emailAddress = authUser.emailAddress;
            const password = authUser.password;
    
            const course = {
                title,
                description,
                estimatedTime,
                materialsNeeded,
                userId
            };
        
            context.data.updateCourse(id, course, emailAddress, password)
            .then( errors => {
                // if (errors.length) {
                if (errors) {
                    setErrors(errors);
                } else {
                    console.log('Course updated');
                    history.push('/');    
                }
                })
            .catch((err) => {
                console.log(err);
                history.push('/error');
            });
        
        }
}