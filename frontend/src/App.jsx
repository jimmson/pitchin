import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import Container from "@material-ui/core/Container";
import Router from "./Router";
import { isLoggedInAdmin, LoggedInContext } from "./utils/auth";
import { GlobalStyles } from "./styles/global";
import "./main.scss";
import { theme } from "./styles/theme";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import useLocale, { fetchLocales } from "./hooks/useLocale";

export default () => {
  const [isLogged, setLogged] = useState(isLoggedInAdmin());

  const [{ locale, messages, loading }] = useLocale();

  useEffect(() => {
    (async () => {
      await fetchLocales();
    })();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <IntlProvider locale={locale} messages={messages[locale]}>
          <ThemeProvider theme={theme}>
            <LoggedInContext.Provider
              value={{ data: isLogged, set: setLogged }}
            >
              <GlobalStyles />
              <Container maxWidth="xl" disableGutters>
                <Router />
              </Container>
            </LoggedInContext.Provider>
          </ThemeProvider>
        </IntlProvider>
      )}
    </>
  );
};
