import { useEffect, useState } from "react"
import { Hamster } from "../models/Hamster"
import { Match } from "../models/Match"

interface MatchwinnersProps {
    close: () => void,
    id: string
    
}

const MatchWinners = ({close, id}:MatchwinnersProps) => {
    const [matchwinners, setMatchwinners] = useState<Hamster[]>([]) 

 useEffect(() => {
    getMatchwinners(id)
 }, []) 


    const getMatchwinners = async(id:string) => {
        const response = await fetch('/matchWinners/'+id)
        const data = await response.json()

        data?.map(async (match: Match) => {
          
            const loser = await fetch('/hamsters/' + match.loserId)
            const loserHamster = await loser.json()

             setMatchwinners(matchwinners => [...matchwinners, loserHamster])
        } )           
       
    }


    return (
        <>
        {matchwinners?.map(hamster => 
            <section className="flip-card" key={hamster.id}>
                <section className="flip-card-inner">
                     <article className="hamster-card-front" >
                        <figure><img src={`/img/${hamster.imgName}`} alt={hamster.name}/></figure>
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
                        <button onClick={close} >Tillbaka till galleriet</button>
                    </article> 
                </section>
            </section>

)} </>
    )
}

export default MatchWinners