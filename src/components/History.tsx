import { useEffect, useState } from "react"
import {Match} from '../models/Match'
import bin from '../icons/bin.svg'
import { Hamster } from "../models/Hamster"


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

const [newMatchesArray, setNewMatchesArray] = useState<Match[]>([])
/* const [winnerHamster, setWinnerHamster] = useState<Hamster>()
const [loserHamster, setLoserHamster] = useState<Hamster>()
 */
const [allHamsters, setAllHamsters] = useState<Hamster[]>([])


useEffect(()=> {
    
    getMatches()
}, [])



async function getMatches() {
        setNewMatchesArray([])
        const response = await fetch('/matches')
        console.log('fetchade')

        const matchesArray = await response.json()
        setNewMatchesArray(matchesArray)
        const response2 = await fetch('/hamsters')
        console.log('fetchade')
        const hamsters = await response2.json()
        setAllHamsters(hamsters)

  
        
        
        

        
    }



    let deleteMatch = async (match: Match, /* winnerHamster: Hamster, loserHamster:Hamster */) => {
        await fetch('/matches/'+match.id, {
            method: 'DELETE'
        }) 
        console.log('fetchade')

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
  
      
  

    return (
        <>
    
        <section className="match-card-container">
            
            {(newMatchesArray.length >0/*  && winnerHamster && loserHamster */)?
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
                    }
                })}
               
                  
                <button onClick={()=>deleteMatch(match/* , winnerHamster, loserHamster */)}> <img src={bin} alt="bin" /></button>
            </section>)
            : <><p>Laddar matcher...</p></>}
       </section>
       </>
    )
}

export default History