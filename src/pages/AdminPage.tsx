import React from "react";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import Orders from "../components/Orders/Orders";
import classes from '../components/Layout/Layout.module.css'

import { Grid, GridItem } from '@chakra-ui/react'


const AdminPage: React.FC = () => {
    return (
      <>
        <Header />
        <Grid h='90vh' templateRows='repeat(2, 1fr)' templateColumns='repeat(6, 1fr)' gap={6} className={classes.main}>
          <GridItem rowSpan={2} colSpan={2} bg='bisque'>
            <Menu />
          </GridItem>
          <GridItem rowSpan={2} colSpan={4} bg='tomato'>
            <Orders />
          </GridItem>
        </Grid>
      </>
    )
}

export default AdminPage;