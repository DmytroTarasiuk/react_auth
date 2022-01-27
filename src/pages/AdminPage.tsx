import React from "react";
import Layout from "../components/Layout/Layout";
import Menu from "../components/Menu/Menu";
import Orders from "../components/Orders/Orders";

const AdminPage: React.FC = () => {
    return (
        <Layout>
            <Menu />
            <Orders />
        </Layout>
    )
}

export default AdminPage;