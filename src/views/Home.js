import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { HeroCard } from '../components/HeroCard'

export const Home = (props) => {

    const history = useHistory()
    const token = localStorage.getItem('accessToken')
    const [teamList, setTeamList] = useState([])

    if (!token) {
        history.push('/auth')
    }

    useEffect(() => {
        
        setTeamList([...props.teamList.good, ...props.teamList.bad])

        

    }, [props.teamList])


    return (
        <div>
            <h1 style={{ fontFamily: 'fantasy', marginTop: '2rem', marginBottom: '2rem', marginLeft: '28rem'}}>Your Team</h1>
            <div className="hero-card-container">
                {teamList.map(hero => {
                    return (
                        <HeroCard
                            key={hero.id}
                            hero={hero}
                            isMember={true}
                            addMember={props.addMember}
                            removeMember={props.removeMember}
                        />
                    )
                })}
            </div>
        </div>
    )
}
