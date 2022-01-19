import React, { useState } from "react";
import './Header.css';
import Button from "@material-ui/core/Button";
import { Tabs, Tab, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import logoUrl from '../../assets/logo.svg';
import { Link } from "react-router-dom";

export default function Header(props) {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isRegisterSuccess, setRegisterSuccess] = useState(false);
  const [open, setModelOpen] = useState(false);
  const [value, setTabVaue] = useState(0);
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerpassword, setRegisterPassword] = useState("");
  const [reqFirstName, setReqFirstName] = useState("dispNone");
  const [reqLastName, setReqLastName] = useState("dispNone");
  const [reqEmail, setReqEmail] = useState("dispNone");
  const [reqPassword, setReqPassword] = useState("dispNone");
  const [reqContact, setReqContact] = useState("dispNone");
  const [reqUsername, setReqUsername] = useState("dispNone");
  const [reqregisterPassword, setReqRegisterPassword] = useState("dispNone");



  const openModelHandler = () => {
    setModelOpen(true);
  };

  const closeModal = () => {
    setModelOpen(false);
  };


  const handleTabChange = (e, val) => {
    setTabVaue(val);
  };

  const inputUsernameChangeHandler = (event) => {
    setUsername(event.target.value);
  }

  const inputPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  const inputFirstnameChangeHandler = (event) => {
    setFirstName(event.target.value);
  }

  const inputLastnameChangeHandler = (event) => {
    setLastName(event.target.value);
  }

  const inputEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const inputContactChangeHandler = (event) => {
    setContact(event.target.value);
  }

  const inputRegPasswordChangeHandler = (event) => {
    setRegisterPassword(event.target.value);
  }


  const registerUserHandler = () => {
    firstname === "" ? setReqFirstName("dispBlock") : setReqFirstName("dispNone");
    lastname === "" ? setReqLastName("dispBlock") : setReqLastName("dispNone");
    contact === "" ? setReqContact("dispBlock") : setReqContact("dispNone");
    email === "" ? setReqEmail("dispBlock") : setReqEmail("dispNone");
    registerpassword === "" ? setReqRegisterPassword("dispBlock") : setReqRegisterPassword("dispNone");


    if (
      firstname === "" ||
      lastname === "" ||
      contact === "" ||
      email === "" ||
      registerpassword === ""
    ) {
      return;
    }

    let dataSignup = JSON.stringify({
      "emai-address": email,
      "first-name": firstname,
      "last-name": lastname,
      "contact-no": contact,
      "password": registerpassword
    });

    fetch(props.baseUrl + 'auth/signup', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: dataSignup,
    })
      .then((response) => response.json())

      .then((data) => {
        setRegisterSuccess(true);
      })

      .catch((error) => {
        setRegisterSuccess(false);
      });
  }

  const loginHandler = () => {

    username === "" ? setReqUsername("dispBlock") : setReqUsername("dispNone");
    password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");

    if (
      username === "" &&
      password === ""
    ) {
      return;
    }

    let dataSigin = JSON.stringify({
      "user-name": username,
      "login-password": password
    });

    setLoggedIn(true);

    // fetch(props.baseUrl + 'auth/login', {
    //   method: 'POST',

    //   headers: {
    //     'Authorization': 'Basic' + window.btoa(username + ':' + password),
    //     'Content-Type': 'application/json',
    //     'Cache-Control': 'no-cache'
    //   },
    //   body: dataSigin,
    // })
    //   .then((response) => response.json())

    //   .then((data) => {
    //     
    //     closeModal();
    //   })

    //   .catch((error) => {
    //     setLoggedIn(false);
    //   });
  }


  const logOutHandler = () => {
    setLoggedIn(false);
  }

  return (
    <div className="header">
      <header className="header">
        <img src={logoUrl} alt="AppLogo" />

        {!isLoggedIn ?
          <Button
            variant="contained"
            color="default"
            onClick={openModelHandler}
            style={{ float: 'right', width: 60, height: 34, margin: 0.5 }}
          >
            LOGIN
          </Button>
          :
          <Button
            variant="contained"
            color="default"
            onClick={logOutHandler}
            style={{ float: 'right', width: 60, height: 34, margin: 0.5 }}
          >
            LOGOUT
          </Button>
        }

        {props.showBookShowBtn === "true" && !isLoggedIn ?
          <div className="book-show-btn">
            <Button
              variant="contained"
              color="primary"
              onClick={openModelHandler}
            >
              BOOK SHOW
            </Button>
          </div>
          : ""
        }

        {props.showBookShowBtn === "true" && isLoggedIn ?
          <div className="book-show-btn">
            <Link to={"/bookshow/" + props.id}>
              <Button
                variant="contained"
                color="primary"
              >
                BOOK SHOW
              </Button>
            </Link>
          </div>
          : ""
        }

      </header>

      <Modal className="modal-login-logout"
        open={open}
        onClose={closeModal}
      >
        <div className="tab-section">
          <Tabs className="tabs" value={value} onChange={handleTabChange} >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {value === 0 &&
            <div className="login-section">
              <FormControl required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" type="text" username={username} onChange={inputUsernameChangeHandler} />
                <FormHelperText className={reqUsername}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br /><br />

              <FormControl required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="text" password={password} onChange={inputPasswordChangeHandler} />
                <FormHelperText className={reqPassword}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br /><br />

              {isLoggedIn === true &&
                <FormControl>
                  <span className="successText">
                    Login Successful!
                  </span>
                </FormControl>
              }
              <br /><br />


              <Button
                variant="contained"
                color="primary"
                style={{ width: 100 }}
                onClick={loginHandler}
              >
                LOGIN
              </Button>
            </div>
          }


          {value === 1 &&
            <div className="register-section">
              <FormControl required>
                <InputLabel htmlFor="firstname">Firstname</InputLabel>
                <Input id="firstname" type="text" firstname={firstname} onChange={inputFirstnameChangeHandler} />
                <FormHelperText className={reqFirstName}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br /><br />

              <FormControl required>
                <InputLabel htmlFor="lastname">Lastname</InputLabel>
                <Input id="lastname" type="text" lastname={lastname} onChange={inputLastnameChangeHandler} />
                <FormHelperText className={reqLastName}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br /><br />

              <FormControl required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="text" email={email} onChange={inputEmailChangeHandler} />
                <FormHelperText className={reqEmail}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br /><br />

              <FormControl required>
                <InputLabel htmlFor="registerpassword">Password</InputLabel>
                <Input id="registerpassword" type="text" registerpassword={registerpassword} onChange={inputRegPasswordChangeHandler} />
                <FormHelperText className={reqregisterPassword}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br /><br />

              <FormControl required>
                <InputLabel htmlFor="contact">Contact</InputLabel>
                <Input id="contact" type="text" contact={contact} onChange={inputContactChangeHandler} />
                <FormHelperText className={reqContact}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br /><br />

              {isRegisterSuccess === true &&
                <FormControl>
                  <span className="successText">
                    Registeration Successfull Please Login!
                  </span>
                </FormControl>
              }
              <br /><br />
              <Button
                variant="contained"
                color="primary"
                style={{ width: 100 }}
                onClick={registerUserHandler}
              >
                Register
              </Button>
            </div>
          }

        </div>
      </Modal>

    </div>
  );
}









