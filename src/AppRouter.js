import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import config from './config'
import { Auth } from './views/Auth';
import { Home } from './views/Home';
import { Search } from './views/Search';
import { NotFound } from './views/NotFound';
import { Navbar } from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

function AppRouter() {

    const APIURL = `/api/${config.APIToken}/`
    sessionStorage.setItem('APIURL', APIURL) // The API's token is saved on sessionStorage to be used as a global variable.
    
    const [teamList, setTeamList] = useState({
        good: [],
        bad: []
    })

    

    const addMember = (hero) => {

        // if the team is full, alert and return.
        if (teamList.good.length + teamList.bad.length === 6) { 
            alert('Team is full')
            return 
        }

        // if there's less than three good heroes, add a hero with good orientation. otherwise, alert.
        if (hero.biography.alignment === 'good') {
            
            if (teamList.good.length < 3) {
                setTeamList({
                    ...teamList,
                    good: [...teamList.good, hero]
                })
                toast.success(hero.name + ' added to the team!')

            } else {
                toast.warning("Good orientation limit on the team is 3.")
                
            }

        // if there's less than three bad heroes, add a hero with bad orientation. otherwise, alert.
        } else if (hero.biography.alignment === 'bad'){ 
            
            if (teamList.bad.length < 3) {
                setTeamList({
                    ...teamList,
                    bad: [...teamList.bad, hero]
                })
                toast.success(hero.name + ' added to the team!')

            } else {
                toast.warning("Bad orientation limit on the team is 3.")
            }

        } else {
            // if hero is neither good or bad, it won't get added.
            toast.error('Team must have three good and three bad heroes')
        }

    }

    const removeMember = (hero) => {

        const { biography: { alignment } } = hero
        const { good, bad } = teamList

        if (alignment === 'good') {
            setTeamList({
                bad,
                good: good.filter(h => h.id !== hero.id)
            })
            toast.info(hero.name + ' removed from the team')
        } else {
            setTeamList({
                good,
                bad: bad.filter(h => h.id !== hero.id)
            })
            toast.info(hero.name + ' removed from the team')
        }
    }

    return (
        <Router>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Navbar />
            <Switch>
                <Route exact path="/auth">
                    <Auth APIURL={APIURL} />
                </Route>
                <Route exact path="/search">
                    <Search addMember={addMember} teamList={teamList} removeMember={removeMember}/>
                </Route>
                <Route exact path="/auth"> 

                </Route>
                <Route exact path="/">
                    <Home key="Home" teamList={teamList} removeMember={removeMember}/>
                </Route>
                <Route path='/404' component={NotFound} />
                <Redirect from='*' to='/404' />
            </Switch>
        </Router>
    );
}

export default AppRouter;
