
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import UserCreds from "../data/UserCreds";
import usp from "../data/userPersonalData";
import axios from 'axios';

 export const GeneralInfoForm =() => {
  
  const [state,setState] =useState({
    "username": UserCreds.username,
    "firstname":usp.firstname,
    "lastname" :usp.lastname,
    "birthday":usp.birthday,
    "gender":usp.gender,
    "email":UserCreds.email,
    "companyname":usp.companyname,
    "phonenumber":usp.phonenumber,
    "homeaddress" :usp.homeaddress,
    "addressnumber": usp.addressnumber,
    "city":usp.city,
    "state":usp.state,
    "zip":usp.zip
  })
   

  
  const [firstName,setFirstName] =useState("");
  const [lastName,setLastName] =useState("");
  const [gender,setGender] = useState("");
  const [birthday, setBirthday] = useState({birthday :state.birthday});
  // const [email,setEmail] = useState("");
  const [companyName,setCompanyName] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")
  const [homeAddress ,setHomeAddress] =useState("");
  const [addressNumber,setAddressNumber] =useState("");
  const [city,setCity] =useState("");
  const [stateCapital,setStateCapital] = useState("");
  const [zip,setZip] =useState("");

  
  const handleInputChange =(e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setState({
      // ...state,
      [name]: value
    });
    console.log(state)
  }



  const saveAll =()=> {
    const stateFull = {
      "username": UserCreds.username,
      "firstname":firstName,
      "lastname" :lastName,
      "birthday": birthday,
      "gender":gender,
      "email":UserCreds.email,
      "companyname":companyName,
      "phonenumber": phoneNumber,
      "homeaddress" :homeAddress,
      "addressnumber":addressNumber,
      "city":city,
      "state":stateCapital, 
      "zip":zip
    }
    
   console.log(stateFull);
   console.log("chinnu gadu ")
   axios.post('http://localhost:5000/api/users/userPersonal', stateFull)
   .then(res => console.log(res.data));

  }


  
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control  required type="text" defaultValue={state.firstname} onChange = {e =>{setFirstName(e.target.value)}} placeholder="Enter your first name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required type="text"    defaultValue={state.lastname} onChange ={e =>{setLastName(e.target.value)}} placeholder="Also your last name" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={e=>{setBirthday(e.target.value)}} />
                    </InputGroup>
                  )} />
              </Form.Group>
             
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender" >
                <Form.Label>Gender</Form.Label>
                <Form.Select   defaultValue={state.gender} onChange={e => {setGender(e.target.value)}}>
                  <option value="1" >Male</option>
                  <option value="2"  >female</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder ={UserCreds.email} Value={UserCreds.email} required type="email"  />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control   required type="number" defaultValue ={state.phonenumber}  placeholder = "enter PhoneNumber" onChange ={e => {setPhoneNumber(e.target.value)}} placeholder={state.phonenumber} />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control  onChange={e => {setHomeAddress(e.target.value)}} required type="text"  placeholder="enter homeaddress" defaultValue={state.homeaddress} />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" defaultValue={state.addressnumber} placeholder="No" onChange={ e => {setAddressNumber(e.target.value)}}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control  required type="text" defaultValue={state.city} placeholder="Enter City" onChange={ e => {setCity(e.target.value)}} />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select id="state" defaultValue={state.state} onChange={ e => {setStateCapital(e.target.value)}}>
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="tel" placeholder="Enter Zip" defaultValue={state.zip}  onChange={e => {setZip(e.target.value)}}  />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit" onClick ={saveAll}>Save All</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};


