import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
// import Context from '../Context';
import { Context } from '../Context';
import Form from './Form';
import axios from 'axios';

export default function UpdateCourse() {
    let history = useHistory();
    let context = useContext(Context);
    const { id } = useParams();
    // const [ course, setCourse ] = useState(
    //     {
    //     id: "",
    //     title: "",
    //     description: "",
    //     estimatedTime: "",
    //     materialsNeeded: "",
    //     user: {
    //         id: "",
    //         firstName: "",
    //         lastName: ""
    //     },
    // }); 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    const authUser = context.authenticatedUser;

    useEffect(() => {
        console.log('UpdateCourse useEffect called');
        axios.get('http://localhost:5000/api/courses/${id}')
            .then(course => {
                setTitle(course.title);
                setDescription(course.description);
                setEstimatedTime(course.estimatedTime);
                setMaterialsNeeded(course.materialsNeeded);
                // console.log(courses)
                // setCourses(courses.data)
            })
            // .then(courses => {setCourses(courses.data)})
            // .then(courses => console.log(courses))
            .catch(err => {
                console.log('Error fetching and parsing data', err);
            });
    }, [id, history]);

    return (
        <main>
        <div class="wrap">
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

    // cancel = () => {
        function cancel() {
            history.push('/');
        }
    
        // change = (event) => {
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
            
        // submit = () => {
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
                if (errors.length) {
                this.setState({ errors });
                } else {
                    console.log('Course created');
                    history.push('/');    
                }
                })
            .catch((err) => {
                console.log(err);
                this.props.history.push('/error');
            });
        
        }
}