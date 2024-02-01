import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';

function Registration() {
  const [show, setShow] = useState(true);
  const[buttonSate,setButtonState]=useState(true)
  const [alldata, setAlldata] = useState([{}])
  const[index,setIndex]=useState(0);
  const [input,setInput]=useState({
    fname:"",
    email:"",
    password:"",
    mobile:""
  })
  function getInputData(e){
    // console.log(e.target)
    let target=e.target;
    let value=target.value;
    let key=target.name;
    // console.log(key,value)
    return(
      setInput((old)=>{
        return{
         ...old,
         [key]:value
        }
      })
    )
  }
  let temp = {};
  const getFormData = (e) => {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    // console.log(formData.get("fname"));
    // console.log(formData.get("email"));
    // console.log(formData.get("password"));
    // console.log(formData.get("mobile"));
    // console.log(formData.get("profile "));
    
    for (let data of formData.entries()) {
      console.log(data);
      let key = data[0];
      let value = data[1];
      // console.log(value);
      // console.log(typeof(value));
      if (typeof (value) == 'object') {
        value = URL.createObjectURL(value)
      }
      // console.log(value);
      temp[key] = value;
      // console.log(temp)
    }
    
  }
  function insertDatata(e){
    e.preventDefault();
    getFormData(e);
    return (
      setAlldata((old) => {
        return [
          ...old, temp
        ]
      }),
      setShow(false),
      setInput({
        fname:"",
        email:"",
        password:"",
        mobile:""
      })
    )
  }
  function updteData(e){
    e.preventDefault();
    getFormData(e);
    // alert(index)
    // console.log(temp)
    const tenpData=[...alldata];
    // console.log(tenpData)
    tenpData[index]=temp;
    // console.log(tenpData)
    return(
      setShow(false),
      setAlldata(tenpData)
    )
  }
  function editData(item){
    // console.log(item)
    // alert(item.index);
    return(
      setShow(true),
      setInput(item),
      setButtonState(false),
      setIndex(item.index)
      
    )
  }
  function deleteUser(index){
    let tempdata=[...alldata];
    // console.log(tempdata);
    tempdata.splice(index,1);//1 is indicate the current index
    console.log(tempdata);
    return(
      setAlldata(tempdata)
    )
  }
  
  function addButton(){
   return(
    setShow(true),
    setInput({
      fname:"",
      email:"",
      password:"",
      mobile:""
    }),
    setButtonState(true)
   )
  }
  function Tr({item}){
    return(
      <>
      <tr className='text-center'>
        <td>{item.index+1}</td>
        <td><img src={item.profile} alt="" width={50} height={50} className='rounded-circle'/></td>
        <td>{item.fname}</td>
        <td>{item.email}</td>
        <td>{item.password}</td>
        <td>{item.mobile}</td>
        <td>
          <Button className='me-2'><i className="fa fa-edit" onClick={()=>editData(item)}></i></Button>
          <Button className='me-2'variant='danger' onClick={()=>{deleteUser(item.index)}}><i className="fa fa-trash"></i></Button>
        </td>
      </tr>
      </>
    )
  }

  return (
    <>  <h1 className='text-center'>Registration Details</h1>
      <Button className='position-absolute bottom-0 end-0 mb-3 me-3 rounded-circle' 
      onClick={addButton}>
        <i className='fa fa-plus'></i>
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={buttonSate ? insertDatata : updteData}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="enter your full name" 
              name="fname"onChange={getInputData}
              value={input.fname} >

              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
              type="email" 
              placeholder="youremail@gmail.com"
              name="email"
              onChange={getInputData} 
              value={input.email}>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="enter your password" 
              name="password"
              onChange={getInputData}
              value={input.password}>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile No</Form.Label>
              <Form.Control 
              type="tel" 
              placeholder="enter your mobile no" 
              name="mobile"
              onChange={getInputData} value={input.mobile}>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile</Form.Label>
              <Form.Control 
              type="file" 
              placeholder="upload your photo" 
              name="profile"
              onChange={getInputData} >
              </Form.Control>
            </Form.Group>
            <Form.Group>
              {
                buttonSate ?<Button type="submit" className='my-2 me-2' variant="success">Submit</Button>:
                <Button type="submit" className='my-2 me-2' variant="info">Update</Button>
              }
              <Button type='reset' variant='danger' onClick={() => setShow(false)}>close</Button>

            </Form.Group>
          </Form>
        </Modal.Body>

      </Modal>
      {/* <p>{JSON.stringify(alldata)}</p> */}
      <Container>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              {/* <th>{JSON.stringify(alldata.fname)}</th> */}
              <th>Sr no</th>
              <th>Profile</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {
              alldata.map((item, index) => {
                item['index']=index;
                return(<Tr item={item} key={index}/>)
                
              }) 
            }
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default Registration