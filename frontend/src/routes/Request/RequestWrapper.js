import React, { useState, useEffect, createContext } from "react";
import { Formik, Form } from "formik";
import axios from "../../utils/axios";
import { isLoggedIn } from "../../utils/auth";
import history from "../../utils/history";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const defaultContext = { categories: [], areas: [] };

export const RequestOptionsContext = createContext(defaultContext);

export default function RequestWrapper(props) {
  const [loginChecked, setLoginChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [requestOptions, setRequestOptions] = useState(defaultContext);

  useEffect(() => {
    if (!isLoggedIn()) {
      history.replace("/auth");
    } else {
      setLoginChecked(true);
    }
    async function fetchData() {
      try {
        const {
          data: {
            categories,
            areas,
            phone: { prefix: phonePrefix },
          },
        } = await axios.get("/api/public/options");

        setRequestOptions({ categories, areas, phonePrefix });

        setIsLoaded(true);
      } catch (e) {
        alert(e.message);
      }
    }
    fetchData();
  }, []);

  if (!loginChecked || !isLoaded) return <LoadingSpinner />;

  return (
    <div className="request">
      <div className="request-wrapper">
        <RequestOptionsContext.Provider value={requestOptions}>
          <Formik
            initialValues={{
              phone: `+${requestOptions.phonePrefix}`,
              date: new Date(),
              startTime: new Date(),
              endTime: new Date(),
              hasDate: false,
            }}
            onSubmit={(values, form) => {
              const decoratedValues = {
                ...values,
                phone: values.phone.replace(/ /g, ""),
              };

              async function next() {
                await axios.post("/api/public/tickets", { ...decoratedValues });
                form.resetForm();
                form.setSubmitting(false);
                history.push("/request/confirmed");
              }
              next();
            }}
            validate={(values) => {
              const errors = {};

              if (!values.request) {
                errors.request = "required";
              }

              if (!values.name) {
                errors.name = "required";
              }

              if (!values.phone) {
                errors.phone = "required";
              }

              if (!/^\+?[\d\s]+$/i.test(values.phone)) {
                errors.phone = "the phone number contains illegal characters";
              }

              const selectedCategory = requestOptions.categories.find(
                (c) => c._id === values.category
              );

              if (
                selectedCategory &&
                selectedCategory.needsAddress &&
                !values.address
              ) {
                errors.address = "required";
              }

              if (!values.area) {
                errors.area = "required";
              }

              return errors;
            }}
          >
            <Form>{props.children}</Form>
          </Formik>
        </RequestOptionsContext.Provider>
      </div>
    </div>
  );
}
