import React from "react";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import Orders from "../components/Orders/Orders";
import classes from '../components/Layout/Layout.module.css'


const AdminPage: React.FC = () => {
    return (
      <>
        <Header />
        <main className={classes.main}>
        <Menu />
        <Orders />
        </main>
      </>
    )
}

export default AdminPage;