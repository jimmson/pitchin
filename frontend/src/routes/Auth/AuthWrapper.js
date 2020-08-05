import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { isLoggedInAdmin } from "../../utils/auth";
import history from "../../utils/history";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function Auth(props) {
  const [isLoginChecked, setIsLoginChecked] = useState(false);

  useEffect(() => {
    if (isLoggedInAdmin()) {
      history.replace("/");
    } else {
      setIsLoginChecked(true);
    }
  }, []);

  if (!isLoginChecked) return <LoadingSpinner />;

  return (
    <Container maxWidth="sm">
      <div>{props.children}</div>
    </Container>
  );
}
