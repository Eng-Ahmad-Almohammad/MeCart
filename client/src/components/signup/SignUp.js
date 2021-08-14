import React from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from '../../actions';
import * as yup from 'yup';

import './style.css';

const SignUp = (props)=> {

  


  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required('Email is a required field'),
    password: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character',
      ),
      confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .when('password', {
        is: (password) => (!!(password && password.length > 0)),
        then: yup.string().oneOf([yup.ref('password')], "Password doesn't match"),
      }),
  });
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });
    const errorr = (err) =>{
      console.log(err);
    }
    return (
      <div id="signOptions">
        <form onSubmit={handleSubmit(props.newUser,errorr)} id="mainform">
        <div isinvalid={!!errors.email}>
        <label>Email</label>
        <div>
          <input
            name="email"
            {...register('email')}
            type="text"
            placeholder="example@eample.com"
          />
          
        </div>
        <strong style={{color:'red'}}>{errors?.email?.message} </strong>
      </div>
      <div isinvalid={!!errors.password}>
        <label>Password</label>
        <div>
          <input
            name="password"
            {...register('password')}
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <strong style={{color:'red'}}>{errors?.password?.message} </strong>
      </div>
      <div isinvalid={!!errors.confirmPassword}>
        <label>Confirm Password</label>
        <div>
          <input
            name="confirmPassword"
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <strong style={{color:'red'}}>{errors?.confirmPassword?.message} </strong>
      </div>
          <button  id="signInButton" type="submit" className="teal btn-flat right white-text ">
            Sign Up
            <i className="material-icons right">done</i>
          </button>
        </form>
          <Link to="/dashboard" className="red btn-flat white-text">
            Cancel
          </Link>
      </div>
    );
  
}

const mapDispatchToProps = (dispatch) => ({
  newUser: (vals) => {
    
    dispatch(actions.signUp(vals))},
});

const modalComponent = connect(null, mapDispatchToProps)(SignUp);





export default modalComponent;
