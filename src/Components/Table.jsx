import React, { useEffect } from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Form from "./Form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Tablee = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //for ADD Emp section
  const [EMPopen, setEMPOpen] = React.useState(false);
  const EMPhandleOpen = () => setEMPOpen(true);
  const EMPhandleClose = () => setEMPOpen(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("female");

  //
  const handleClick = (e) => {
    // console.log(e);
    handleOpen();
    setEditData(e);
  };

  const handleSubmit = async () => {
    const payload = {
      name,
      email,
      phone,
    };
    // console.log()
    await fetch(`http://localhost:8080/assignment/${editData.id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" },
    }).then((res) => console.log(res));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/assignment/${id}`, {
      method: "DELETE",
    }).then((res) => console.log(res));
  };

  useEffect(() => {
    fetch("http://localhost:8080/assignment")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, [handleDelete]);

  return (
    <div style={{ padding: "30px" }}>
      <div>
        <Button variant="contained" onClick={EMPhandleOpen}>
          ADD EMPLOYEE
        </Button>
      </div>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Date of Birth</TableCell>
              <TableCell align="center">EDIT</TableCell>
              <TableCell align="center">DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={item.id}
              >
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.phone}</TableCell>
                <TableCell align="center">{item.gender}</TableCell>
                <TableCell align="center">{item.DOB}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleClick(item)}>EDIT</Button>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleDelete(item.id)}>DELETE</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        {/* <Button >Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              label="Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Phone"
              variant="outlined"
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <br />
            <Button variant="contained" onClick={handleSubmit}>
              EDIT CHANGES
            </Button>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={EMPopen}
          onClose={EMPhandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Form />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Tablee;
