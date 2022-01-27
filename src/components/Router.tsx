import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AdminPage from '../pages/AdminPage'
import AuthPage from '../pages/AuthPage'
import AuthContext from '../store/auth-context'


const Router: React.FC = () => {

    const authCtx = useContext(AuthContext);

    return (
        <Switch>
            <Route path='/admin'>
                {authCtx.isLoggedIn && <AdminPage />}
                {!authCtx.isLoggedIn && <Redirect to='/' />}
            </Route>
            <Route path='/' exact>
                <AuthPage />
            </Route>
        </Switch>
    )
}


export default Router