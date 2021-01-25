import React from 'react';
import HeaderStats from '../../components/header/HeaderStats';
import LoanRecyclerView from '../../components/loans/LoanRecyclerView';

function MainPage() {
  return (
    <React.Fragment>
      <HeaderStats/>
      <LoanRecyclerView/>
    </React.Fragment>
  );
}

export default MainPage;
