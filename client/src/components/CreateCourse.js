import React, {useState, useEffect, useContext} from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
// import Context from '../Context';
import { Context } from '../Context';
import Form from './Form';

export default function CreateCourse() {

    let history = useHistory();
    const context = useContext(Context);
    const authUser = context.authenticatedUser;

    // const [ course, updateCourse ] = useState({
    //     title: "",
    //     description: "",
    //     estimatedTime: "",
    //     materialsNeeded: "",
    // }); 

    // console.log(authUser);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    // cancel = () => {
    function cancel() {
        history.push('/');
    }

    // change = (event) => {
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
    
        context.data.createCourse(course, emailAddress, password)
        .then( errors => {
        //   if (errors.length) {
          if (errors.length && errors) {
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
