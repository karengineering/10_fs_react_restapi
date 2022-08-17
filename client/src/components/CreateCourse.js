import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form'; 

export default function CreateCourse() {

    let history = useHistory();
    const context = useContext(context);
    const authUser = context.authenticatedUser;

    // const [ course, updateCourse ] = useState({
    //     title: "",
    //     description: "",
    //     estimatedTime: "",
    //     materialsNeeded: "",
    // }); 

    console.log(authUser);

    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [estimatedTime, setEstimatedTime] = useState('');
    // const [materialsNeeded, setMaterialsNeeded] = useState('');
    // const [errors, setErrors] = useState([]);

    // cancel = () => {
    //     history.push('/');
    // }

    // change = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
        
    //     if(name === "title") {
    //         setTitle(value);
    //     } else if (name === "description") {
    //         setDescription(value);
    //     } else if (name === "estimatedTime") {
    //         setEstimatedTime(value);
    //     } else if (name === "materialsNeeded") {
    //         setMaterialsNeeded(value);
    //     } else {
    //         return ;
    //     }
    //   }
    
    // submit = () => {
    //     const course = {
    //       firstName,
    //       lastName,
    //       emailAddress,
    //       password,
    //     } = this.state;
    
    //     // Create user
    //     const user = {
    //       firstName,
    //       lastName,
    //       emailAddress,
    //       password,
    //     };
    
    //     context.data.createUser(user)
    //     .then( errors => {
    //       if (errors.length) {
    //         this.setState({ errors });
    //       } else {
    //         context.actions.signIn(emailAddress, password)
    //           .then(() => {
    //             this.props.history.push('/');    
    //           });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.props.history.push('/error');
    //     });
    
    // }
    


    // return (
    //     <main>
    //         <div className="wrap">
    //             <h2>Create Course</h2>
    //             {/* <div className="validation--errors">
    //                 <h3>Validation Errors</h3>
    //                 <ul>
    //                     <li>Please provide a value for "Title"</li>
    //                     <li>Please provide a value for "Description"</li>
    //                 </ul>
    //             </div> */}
    //             <Form 
    //                 cancel={cancel}
    //                 errors={errors}
    //                 submit={submit}
    //                 submitButtonText="Create Course"
    //                 elements={() => (
    //                     <React.Fragment>
    //                         <div className="main--flex">
    //                             <div>
    //                                 <label htmlFor="title">Course Title</label>
    //                                 <input id="title" name="title" type="text" value={title} onChange={change} />
    //                                 <p>By {authUser.firstName} {authUser.lastName}</p>
                                    
    //                                 <label for="description">Course Description</label>
    //                                 <textarea id="description" name="description" value={description} onChange={change}></textarea>
    //                             </div>

    //                             <div>
    //                                 <label htmlFor="estimatedTime">Estimated Time</label>
    //                                 <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={change}/>

    //                                 <label htmlFor="materialsNeeded">Materials Needed</label>
    //                                 <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={change}></textarea>
    //                             </div>
    //                         </div>
    //             </React.Fragment>
    //             )}
    //         />
    //     </div>
    // </main>
    // );
}
