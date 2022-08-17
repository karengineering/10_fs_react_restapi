import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
// import Context from '../Context';
import { Context } from '../Context';
import Form from './Form';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export default function UpdateCourse() {
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
    const authUser = Context.authenticatedUser;


}