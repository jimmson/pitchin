import React, { useState, useEffect, createContext, useContext } from "react";
import { Formik, Field, Form } from "formik";
import isEmail from "isemail";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FormattedMessage } from "react-intl";
import axios from "../../utils/axios";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DialogContent from "@material-ui/core/DialogContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

const UsersContext = createContext({ data: [], set: () => {} });

const UserEditModal = ({ user, setSelectedUser }) => {
  const { data, set } = useContext(UsersContext);

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      onClose={() => setSelectedUser(null)}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={() => setSelectedUser(null)}
      >
        Edit User
      </DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={{
            status: { admin: user.status.admin },
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email,
          }}
          onSubmit={async (values, formik) => {
            try {
              await axios.put(`/api/users/${user._id}`, values);
              const { data: newUserData } = await axios.get(
                `/api/users/${user._id}`
              );
              set(
                data.map((u) => (u._id === newUserData._id ? newUserData : u))
              );
              setSelectedUser(null);
              formik.setSubmitting(false);
            } catch (e) {
              alert(e.message);
            }
          }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "required";
            } else if (!isEmail.validate(values.email)) {
              errors.email = "Invalid";
            }

            return errors;
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="firstName"
                  label={<FormattedMessage id="locale.fieldFirstName" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="lastName"
                  label={<FormattedMessage id="locale.fieldLastName" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label={<FormattedMessage id="locale.fieldEmail" />}
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  className={"mt-10"}
                  control={
                    <Field name="status.admin">
                      {({ field }) => (
                        <Checkbox
                          color="primary"
                          name={field.name}
                          checked={field.value}
                          {...field}
                        />
                      )}
                    </Field>
                  }
                  label={<FormattedMessage id="admin" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field>
                  {({ form }) => (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={form.isSubmitting || !form.isValid}
                    >
                      <FormattedMessage id="save" />
                    </Button>
                  )}
                </Field>
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => setSelectedUser(null)}
                >
                  <FormattedMessage id="cancel" />
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles({
  container: {
    padding: "8 0 8 0",
    elevation: 0,
  },
  table: {
    minWidth: "100%",
  },
  wapper: {
    backgroundColor: "#f5f5f5",
  },
});

const UsersTable = ({ rows }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const classes = useStyles();

  return (
    <div className={classes.wapper}>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Registered</TableCell>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{[row.firstName, row.lastName].join(" ")}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  {row.status?.registered ? <CheckIcon /> : <ClearIcon />}
                </TableCell>
                <TableCell align="center">
                  {row.status?.admin ? <CheckIcon /> : <ClearIcon />}
                </TableCell>
                <TableCell align="right">
                  <ButtonGroup>
                    <Button onClick={() => setSelectedUser(row)}>
                      <EditIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <UserEditModal user={selectedUser} setSelectedUser={setSelectedUser} />
      )}
    </div>
  );
};

const InviteUserForm = () => {
  const { data, set } = useContext(UsersContext);
  const [isVisibleForm, showForm] = useState(false);

  if (!isVisibleForm) {
    return (
      <div className={"flex flex_reverse mt-10"}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            showForm(true);
          }}
        >
          <FormattedMessage id="inviteUser" />
        </Button>
      </div>
    );
  }

  return (
    <Grid
      container
      spacing={0}
      alignItems="flex-start"
      justify="flex-end"
      direction="row"
    >
      <Grid item xs={12}>
        <Formik
          onSubmit={async (values, formik) => {
            try {
              const {
                data: { id },
              } = await axios.post("/api/users/invite", values);
              formik.resetForm();
              const { data: user } = await axios.get(`/api/users/${id}`);
              set(data.concat([user]));
              formik.setSubmitting(false);
            } catch (e) {
              alert(e.message);
            }
          }}
          initialValues={{ admin: false, email: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "required";
            } else if (!isEmail.validate(values.email)) {
              errors.email = "Incorrect";
            }

            return errors;
          }}
          isInitialValid={false}
        >
          <Form className="input-container">
            <Field
              as={TextField}
              name="email"
              type="email"
              label="email"
              required
            />
            <Field name="admin">
              {({ field }) => (
                <Checkbox name={field.name} checked={field.value} {...field} />
              )}
            </Field>
            <Field>
              {({ form }) => (
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={form.isSubmitting || !form.isValid}
                >
                  <FormattedMessage id="invite" />
                </Button>
              )}
            </Field>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    setIsLoadingUsers(true);
    try {
      const { data } = await axios.get("/api/users");
      setUsers(data.users);
    } catch (error) {
      alert(error.message);
    }
    setIsLoadingUsers(false);
  }

  return (
    <div className="dashboard-children users">
      <div className="dashboard-children-wrapper">
        <UsersContext.Provider value={{ data: users, set: setUsers }}>
          <div className="users-wrapper">
            {isLoadingUsers ? <LoadingSpinner /> : <UsersTable rows={users} />}
            <InviteUserForm />
          </div>
        </UsersContext.Provider>
      </div>
    </div>
  );
}
