import React from "react";
import TextField from "@mui/material/TextField";
import styles from "../Styles/form.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Checkbox, FormGroup } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";

const Form = () => {


  const [name,setName] = useState("")
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [DOB,setDOB] = useState("");

  const [gender, setGender] = useState("female");


  const handleSubmit = async () => {
    // console.log(name,email,phone,DOB,gender)
    const payload = {
        name,
        email,
        phone,
        DOB,
        gender
    }
    
    await fetch("http://localhost:8080/assignment",{
        method : "POST",
        body : JSON.stringify(payload),
        headers : {"Content-type" : "application/json"}

    }).then((res) => console.log(res))

    
  }

  return (
    <div className={styles.container}>
      <TextField label="Name" variant="outlined" onChange={(e) => setName(e.target.value)}/>
      <br />
      <br />
      <TextField label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <br />
      <TextField label="Phone" variant="outlined" onChange={(e) => setPhone(e.target.value)} />
      <br />
      <br />
      <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
      <br />
      <div>
      <h3>Date of Birth</h3>
        <input type="date" label = "DOB" onChange={(e) => setDOB(e.target.value)}/>
      </div>

      {/* <div>
        <h3>Hobbies</h3>

        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        <FormControlLabel control={<Checkbox />} label="Disabled" />
      </div> */}
      <br />

      <div>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default Form;
