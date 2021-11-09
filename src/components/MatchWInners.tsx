import { useEffect, useState } from "react"
import { Hamster } from "../models/Hamster"
import { Match } from "../models/Match"

interface MatchwinnersProps {
    close: () => void,
    id: string
    
}

const MatchWinners = ({close, id}:MatchwinnersProps) => {
    const [matchLosers, setMatchLosers] = useState<Hamster[]>([]) 
 
 useEffect(() => {
    const getMatchLosers = async(id:string) => {
        const response = await fetch('/matchWinners/'+id)
        console.log('fetchade')

        const data = await response.json()

        let loserIds = data.map((match:Match) => match.loserId)
        let uniqueLoserIds:string[] = []
        loserIds.forEach((id:string) =>{
            if (!uniqueLoserIds.includes(id)) {
                uniqueLoserIds.push(id)
            }
        })
        uniqueLoserIds.map(id => getLosers(id))
        }    
        
      const getLosers = async(id:string) => {
        const loser = await fetch('/hamsters/' + id)
        console.log('fetchade')

        const loserHamster = await loser.json()

        setMatchLosers(matchLosers => [...matchLosers, loserHamster])
      }

    getMatchLosers(id)
    
 }, [id]) 


    
    

 

    return (
        <section className="grid-container">

        {matchLosers?.map(hamster => 
            <section className="flip-card" key={hamster.id+hamster.name}>
                <section className="flip-card-inner">
                     <article className="hamster-card-front" >
                        <figure><img src={hamster.imgName.includes('http') ? hamster.imgName : `/img/${hamster.imgName}` } alt={hamster.name}/></figure>
                        <h3>{hamster.name}</h3>
                     </article>
                    <article className="hamster-card-back">
                        <h2>{hamster.name}</h2>
                        <p>Ålder: {hamster.age}</p>
                        <p>Älskar: {hamster.loves}</p>
                        <p>Antal matcher: {hamster.games}</p>
                        <p>Antal vinster: {hamster.wins}</p>
                        <p>Antal förluster: {hamster.defeats}</p>
                        <p>Favvomat: {hamster.favFood}</p>
                        <button onClick={close}>Tillbaka till galleriet</button>
                    </article> 
                </section>
            </section>

)} </section>
    )
}

export default MatchWinners