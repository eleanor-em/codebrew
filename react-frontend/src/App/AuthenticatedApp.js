/* Purpose: Controls the routes of authenticated users. Allows access to
    Profile Page, FamilyManagement Page and Home Page (User Panel) */

    import React, { Component } from 'react';
    // import { Route, Switch } from 'react-router-dom';
    /* import UserPanel from './pages/UserPanel';
    import FamilyManagement from './pages/FamilyManagement';
    import SearchArtifacts from './pages/SearchArtifacts';
    import Profile from './pages/Profile'; */
    
    class AuthenticatedApp extends Component {
    
        /* userPanel = (props) => {
            return (
                <UserPanel user={ this.props.user }/>
            );
        }
    
        userProfile = (props) => {
            return (
                <Profile user={ this.props.user }/>
            );
        }
    
        userFamily = (props) => {
            return (
                <FamilyManagement user={this.props.user}/>
            );
        }
        searchArtifacts = (props) => {
            return (
                <SearchArtifacts user={this.props.user}/>
            )
        } */
        render() {
            return (
                <p> Ankita Dhar </p>
                /* <Switch>
                    <Route exact path='/' component={ this.userPanel }/>
                    <Route exact path='/family' component={this.userFamily}/>
                    <Route exact path='/profile' component={ this.userProfile }/>
                    <Route exact path='/search/:searchText' component={this.searchArtifacts} />
                    <Route exact path='/search/?' component={this.searchArtifacts} />
                </Switch> */
            )
        }
    }
    
    export default AuthenticatedApp;
    