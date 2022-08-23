import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';
import Form from './Form';

/*
This component provides the "Create Course" screen by rendering a form that allows a user to create a new course. 
The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. 
This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
*/
export default function CreateCourse() {

    let history = useHistory();
    const context = useContext(Context);
    const authUser = context.authenticatedUser;

    //store data from API in 1st var, use 2nd var to update the data's state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    //go back to home pg
    function cancel() {
        history.push('/');
    }
    
    function change(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        if(name === "title") {
            setTitle(value);
        } else if (name === "description") {
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
    
        context.data.createCourse(course, emailAddress, password)
        .then( errors => {
          if (errors) {
            setErrors(errors);
        } else {
                console.log('Course created');
                history.push('/');    
            }
          })
        .catch((err) => {
          console.log(err);
          history.push('/error');
        });
    }
    
    //displays validation errors if missing title and/or description
    //mimics create-course.html
    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <Form 
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Create Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="title">Course Title</label>
                                    <input id="title" name="title" type="text" value={title} onChange={change} />
                                    <p>By {authUser.firstName} {authUser.lastName}</p>
                                    
                                    <label htmlFor="description">Course Description</label>
                                    <textarea id="description" name="description" value={description} onChange={change}></textarea>
                                </div>

                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={change}/>

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

}
