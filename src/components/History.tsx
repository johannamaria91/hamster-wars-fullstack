import { useEffect, useState } from "react"
import {Match} from '../models/Match'
import {Hamster} from '../models/Hamster'

interface MatchWithNames {
    id: string,
    winnerName: string,
    winnerImg: string,
    loserName: string,
    loserImg: string,
/*     winnerId: string,
    loserId: string
 */}

const History = () => {

const [newMatchesArray, setNewMatchesArray] = useState<MatchWithNames[]>([])
/* const [winnerHamster, setWinnerHamster] = useState<Hamster>()
const [loserHamster, setLoserHamster] = useState<Hamster>()
 */

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
            loserImg: loserHamster.imgName,
/*             winnerId: match.winnerId,
            loserId: match.loserId
 */        } 
/*         setWinnerHamster(winnerHamster)
        setLoserHamster(loserHamster)           
 */        setNewMatchesArray(newMatchesArray => [...newMatchesArray, newMatchObject] )

    })
        
    }



    let deleteMatch = async (match: MatchWithNames, /* winnerHamster: Hamster, loserHamster:Hamster */) => {
        await fetch('/matches/'+match.id, {
            method: 'DELETE'
        }) 

       /*  await fetch('/matches/'+match.winnerId, {
            method: 'PUT',
            body: JSON.stringify({wins: winnerHamster.wins -1,
            games: winnerHamster.games -1}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"}
        })

        await fetch('/matches/'+match.loserId, {
            method: 'PUT',
            body: JSON.stringify(
                {defeats: loserHamster.defeats -1,
                games: loserHamster.games -1}),
            headers: {
                "Content-type": "application/json; charset=UTF-8" }
        }) */

        getMatches()
    }

      
        
      
    console.log(newMatchesArray)

    return (
        <section className="match-card-container">
            
            {(newMatchesArray/*  && winnerHamster && loserHamster */)?
            newMatchesArray.map(match => 
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
                  
                <button onClick={()=>deleteMatch(match/* , winnerHamster, loserHamster */)}> Ta bort match</button>
            </section>)
            : "Laddar..."}
       </section>
    )
}

export default History