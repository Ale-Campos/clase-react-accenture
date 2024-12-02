"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Apellido",
    width: 150,
  },
  {
    field: "username",
    headerName: "Usuario",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) =>
      `${row.firstName || ""}.${row.lastName || ""}`.toLowerCase(),
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function DataGridDemo({ handleEdit }) {
  return (
    <Box padding={1} sx={{ height: 400, width: 590 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        rowSelection
        onRowClick={(data) => {
          console.log("Row clicked", data);
          handleEdit(data.row);
        }}
        onRowSelectionModelChange={(data) => {
          console.log("Row selected", data);
        }}
      />
    </Box>
  );
}

function BasicCard({ user }) {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAge(user.age);
  }, [user]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    console.log("Saving user", user);
    setEditing(false);
  };

  const handleCancel = () => {
    console.log("Canceling user", user);
    setEditing(false);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <TextField
          disabled={!editing}
          label="First name"
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          disabled={!editing}
          label="Last name"
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          disabled={!editing}
          type="number"
          label="Age"
          value={age || ""}
          onChange={(e) => setAge(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button
          onClick={editing ? handleSave : handleEdit}
          color={editing ? "success" : "primary"}
          variant="contained"
          size="small"
        >
          {editing ? "Guardar" : "Editar"}
        </Button>
        <Button
          onClick={editing ? handleCancel : handleEdit}
          variant="contained"
          color={editing ? "info" : "error"}
          size="small"
        >
          {editing ? "Cancelar" : "Eliminar"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default function PageUsuarios() {
  const [editedUser, setEditedUser] = useState(null);

  const handleEdit = (user) => {

    if(user.id === editedUser?.id) {
      setEditedUser(null);
      return;
    }
    setEditedUser(user);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <h1>Usuarios</h1>
      <DataGridDemo handleEdit={handleEdit} />

      {editedUser && <BasicCard user={editedUser} />}
    </div>
  );
}
