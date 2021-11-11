import { useEffect, useState } from "react"
import {Match} from '../models/Match'
import bin from '../icons/bin.svg'
import { Hamster } from "../models/Hamster"




const History = () => {

const [newMatchesArray, setNewMatchesArray] = useState<Match[]>([])

const [allHamsters, setAllHamsters] = useState<Hamster[]>([])


useEffect(()=> {
    
    getMatches()
}, [])



async function getMatches() {
        setNewMatchesArray([])
        const response = await fetch('/matches')
        

        const matchesArray = await response.json()
        setNewMatchesArray(matchesArray)
        const response2 = await fetch('/hamsters')
        
        const hamsters = await response2.json()
        setAllHamsters(hamsters)

        
    }



    let deleteMatch = async (match: Match) => {
        await fetch('/matches/'+match.id, {
            method: 'DELETE'
        }) 
        

        let winner = allHamsters.find(hamster => match.winnerId === hamster.id)
        let loser = allHamsters.find(hamster => match.loserId === hamster.id)

        if (!winner || !loser) {
            return 
        }
       await fetch('/hamsters/'+match.winnerId, {
            method: 'PUT',
            body: JSON.stringify({wins: winner.wins -1,
            games: winner.games -1}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"}
        })

        await fetch('/hamsters/'+match.loserId, {
            method: 'PUT',
            body: JSON.stringify(
                {defeats: loser.defeats -1,
                games: loser.games -1}),
            headers: {
                "Content-type": "application/json; charset=UTF-8" }
        }) 

        getMatches()
    }
  
      
  

    return (
        <>
    
        <section className="match-card-container">
            
            {(newMatchesArray.length >0)?
            newMatchesArray.map(match => 
            <section className="match-card" key={match.id}>

                {allHamsters.map(hamster => {
                    if (hamster.id === match.winnerId) {
                        return <article key={hamster.id}>
                        <h3>Vinnare</h3>
                       <figure> <img src={hamster.imgName.includes('http') ? hamster.imgName : `/img/${hamster.imgName}`} alt={hamster.imgName} /></figure>
                        <h4>{hamster.name}</h4>
                    </article> 
                    } else if (hamster.id === match.loserId) {
                        return <article key={hamster.id}>
                        <h3>Förlorare</h3>
                        <figure><img src={hamster.imgName.includes('http') ? hamster.imgName : `/img/${hamster.imgName}`} alt={hamster.imgName}/></figure>
                        <h4>{hamster.name}</h4>
                    </article>
                    } else {
                        return null
                    }
                })}
               
                  
                <button onClick={()=>deleteMatch(match)}> <img src={bin} alt="bin" /></button>
            </section>)
            : <><p>Laddar matcher...</p></>}
       </section>
       </>
    )
}

export default History