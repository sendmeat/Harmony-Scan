import React, { useState, useEffect } from 'react';
import Footer from '../components/UI/Footer/footer';
import SelectAccount from '../components/Accounts/selectAccount';
import SelectExchange from '../components/Exchanges/selectExchange';
import StepperUI from '../components/UI/StepperUI/StepperUI';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    margin: "0 auto",
    width: "100%",
    height: "50vh",
  },
  contentWrap: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "2.5rem",
  },
  fixed: {
    position: "fixed",
  },
}));


const Account = () => {

  const classes = useStyles();
  const [savedAccounts, setSavedAccounts] = useState(null);
  const [accountsBool, setAccountsBool] = useState(false);
  const [savedExchanges, setSavedExchanges] = useState(undefined);
  const [exchangesBool, setExchangesBool] = useState(false);
  const [nextPage, setNextPage] = useState(0);
  const [step, setStep] = useState(0);

  const selectAccountsHandler = async (accounts) => {
    if (accounts.length == 2) {
      setAccountsBool(true);
      setSavedAccounts(accounts);
    } else {
      setAccountsBool(false);
    };
  };

  useEffect(() => {
    const renderStepperAcc = (bool) => {
      switch (bool) {
        case true:
          setStep(1);
          break;
        case false:
          setStep(0);
          break;
      };
    };
    renderStepperAcc(accountsBool);
  }, [accountsBool]);

  const selectExchangesHandler = (exchanges) => {
    if (exchanges.length == 2) {
      console.log('Success');
      setExchangesBool(true);
      setSavedExchanges(exchanges);
    } else {
      setExchangesBool(false);
    };
  };

  useEffect(() => {
    const renderStepperEx = (bool) => {
      switch (bool) {
        case true:
          setStep(2);
          break;
        case false:
          setStep(1);
          break;
      };
    };
    console.log(accountsBool);
    if (accountsBool) {
      renderStepperEx(exchangesBool);
    };
  }, [exchangesBool]);

  const selectNextHandler = (bool) => {
    if (bool) {
      setNextPage((prevActivePage) => prevActivePage + 1);
    } else {
      setNextPage((prevActivePage) => prevActivePage - 1);
      if (nextPage == 1) {
        setSavedExchanges(undefined);
        setExchangesBool(false);
      }
    };
  };


  return (
    <>
      <h1>Create Visualization</h1>
      <div className={classes.container}>
        {nextPage==0 && <SelectAccount onSelectAccounts={selectAccountsHandler} onGetSavedAccounts={savedAccounts} />}
        {nextPage==1 && <SelectExchange onSelectExchanges={selectExchangesHandler} onGetSavedExchanges={savedExchanges}/>}
        {nextPage==2 && <p>No</p>}
        <div className={classes.contentWrap}>
          <StepperUI changeStep={step} onSelectNext={selectNextHandler} className={classes.fixed}/>
        </div>
      </div>  
      <Footer />
    </>
  );
  

}

export default Account;