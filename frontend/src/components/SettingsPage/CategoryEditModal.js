import React from "react";
import { Formik, Field, Form } from "formik";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "../../utils/axios";
import { FormattedMessage } from "react-intl";
import { FormControlLabel, TextField, MenuItem, Grid } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const CategoryEditModal = ({
  data,
  deleteCategory,
  selectedCategoryEdited,
}) => {
  const { action, selected: category } = data;

  const organisations = ["Ladles of Love", "Greenpop"];

  const handleDelete = () => {
    deleteCategory(category);
    selectedCategoryEdited();
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      onClose={() => selectedCategoryEdited()}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={() => selectedCategoryEdited()}
      >
        {`${action === "edit" ? "Edit" : "New"} Category`}
      </DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={{
            name: category?.name || "",
            description: category?.description || "",
            needsAddress: category?.needsAddress || false,
            organisation: category?.organisation || "",
          }}
          onSubmit={async (values, formik) => {
            try {
              if (action === "add") {
                await axios.post("/api/categories/", values);
              } else {
                await axios.put(`/api/categories/${category._id}`, values);
              }

              formik.setSubmitting(false);
              selectedCategoryEdited();
            } catch (e) {
              alert(e.message);
            }
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "required";
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
                  name="name"
                  label={<FormattedMessage id="locale.fieldName" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="description"
                  label={<FormattedMessage id="locale.fieldDescription" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="organisation"
                  // TODO():localise.
                  label="organisation"
                  variant="outlined"
                  fullWidth
                  required
                  select
                >
                  {organisations.map((organisation, index) => (
                    <MenuItem value={organisation} key={index}>
                      {organisation}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  className={"mt-10"}
                  control={
                    <Field name="needsAddress">
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
                  label={<FormattedMessage id="needsAddress" />}
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
                  onClick={() => selectedCategoryEdited()}
                >
                  <FormattedMessage id="cancel" />
                </Button>
                {action === "edit" ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    onClick={() => handleDelete()}
                  >
                    <FormattedMessage id="delete" />
                  </Button>
                ) : (
                  <div />
                )}
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
