import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { HeroCard } from '../components/HeroCard';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';




export const Search = (props) => {

    const history = useHistory()
    const token = localStorage.getItem('accessToken')
    const APIURL = sessionStorage.getItem('APIURL')
    const [heroesList, setHeroesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    let teamListIds = []

    if (props.teamList) {
        teamListIds = [...props.teamList.good, ...props.teamList.bad].map(h => h.id)
    }

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.get(APIURL + '/search/' + searchTerm)
            .then(res => setHeroesList(res.data.results))
    }

    if (!token) {
        history.push('/auth')
    }


    return (
        <div style={{ fontFamily: 'fantasy', width: '100%', marginTop: '2rem', marginBottom: '2rem'}}>
            <h1 class="title">Search</h1>

            <Form onSubmit={handleSubmit}>
                <input style={{ marginTop: '3rem', marginBottom: '2rem', marginRight: '1rem'}}class="input" onChange={handleInputChange} type="text" placeholder="Type a Superhero Name..." required/>
                <Button type="submit" variant="success">Search</Button>
         

            </Form>
             
           
            <div className="hero-card-container">
                {heroesList.map(hero => {
                    return (
                        <HeroCard
                            key={hero.id}
                            hero={hero}
                            isMember={teamListIds.includes(hero.id)}
                            addMember={props.addMember}
                            removeMember={props.removeMember}
                        />
                        
                    )
                })}
            </div>
            

        </div>
    )
}
