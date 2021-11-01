import { useEffect, useState } from "react"
import {Match} from '../models/Match'

interface MatchWithNames {
    id: string,
    winnerName: string,
    winnerImg: string,
    loserName: string,
    loserImg: string
}

const History = () => {

const [newMatchesArray, setNewMatchesArray] = useState<MatchWithNames[]>([])


useEffect(()=> {
    
    getMatches()
}, [])



async function getMatches() {
        setNewMatchesArray([])
        const response = await fetch('/matches')
        const matchesArray = await response.json()

        matchesArray?.map(async (match: Match) => {
            const winner = await fetch('/hamsters/' + match.winnerId)
            const winnerHamster = await winner.json()
        
            const loser = await fetch('/hamsters/' + match.loserId)
            const loserHamster = await loser.json()

            const newMatchObject: MatchWithNames = {
            id: match.id,
            winnerName: winnerHamster.name,
            winnerImg: winnerHamster.imgName,
            loserName: loserHamster.name,
            loserImg: loserHamster.imgName
        }            
        setNewMatchesArray(newMatchesArray => [...newMatchesArray, newMatchObject] )

    })
        
    }



    let deleteMatch = async (id:string) => {
        await fetch('/matches/'+id, {
            method: 'DELETE'
        }) 
        getMatches()
    }

      
        
      
    console.log(newMatchesArray)

    return (
        <section className="match-card-container">
            
            {newMatchesArray?.map(match => 
            <section className="match-card" key={match.id}>
                <article>
                    <h3>Vinnare</h3>
                   <figure> <img src={`/img/${match.winnerImg}`} /></figure>
                    <h4>{match.winnerName}</h4>
                </article>

                <article>
                    <h3>Förlorare</h3>
                    <figure><img src={`/img/${match.loserImg}`} /></figure>
                    <h4>{match.loserName}</h4>
                </article>
                  
                <button onClick={()=>deleteMatch(match.id)}> Ta bort match</button>
            </section>)}
       </section>
    )
}

export default History