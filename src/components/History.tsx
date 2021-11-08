import { useEffect, useState } from "react"
import {Match} from '../models/Match'
import bin from '../icons/bin.svg'


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
    const [searchString, setSearchString] = useState<string>('')
    const filteredMatches: MatchWithNames[] = filterMatches(newMatchesArray, searchString)

    function filterMatches(matches: MatchWithNames[], searchString: string): MatchWithNames[] {
        return matches.filter(match => {
           if( searchString === '' ) {
               // Visa alla matcher
               return true
           } else {
               // Visa alla matcher som matchar söksträngen
               const winner = match.winnerName.toLowerCase()
               const loser = match.loserName.toLowerCase()
               const search = searchString.toLowerCase()
    
               // Leta både i vinnare och förlorare för att få med alla matcher hamstern varit med i
               return winner.includes(search) || loser.includes(search)
    
               
           }
       })
    }
      
  

    return (
        <>
        <input type="text"
            placeholder="Sök hamster..."
			value={searchString}
			onChange={event => setSearchString(event.target.value)}
			/>
        <section className="match-card-container">
            
            {(newMatchesArray.length >0/*  && winnerHamster && loserHamster */)?
            filteredMatches.map(match => 
            <section className="match-card" key={match.id}>
                <article>
                    <h3>Vinnare</h3>
                   <figure> <img src={match.winnerImg.includes('http') ? match.winnerImg : `/img/${match.winnerImg}`} alt={match.winnerName} /></figure>
                    <h4>{match.winnerName}</h4>
                </article>

                <article>
                    <h3>Förlorare</h3>
                    <figure><img src={match.loserImg.includes('http') ? match.loserImg : `/img/${match.loserImg}`} alt={match.loserName}/></figure>
                    <h4>{match.loserName}</h4>
                </article>
                  
                <button onClick={()=>deleteMatch(match/* , winnerHamster, loserHamster */)}> <img src={bin} alt="bin" /></button>
            </section>)
            : <><p>Inga matcher i historiken ännu.</p> <p>Gå till tävlingsfliken och spela en match!</p></>}
       </section>
       </>
    )
}

export default History