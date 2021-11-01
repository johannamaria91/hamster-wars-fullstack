import { Hamster } from "../models/Hamster";
import {useState, useEffect} from 'react'

interface NewBattleProps {
      pickWinner: (winnerHamster:Hamster, loserHamster:Hamster) => void
}

const NewBattle = ({pickWinner}:NewBattleProps) => {

    const [firstHamster, setFirstHamster] = useState<null | Hamster>(null)
    const [secondHamster, setSecondHamster] = useState<null | Hamster>(null)


    useEffect(() => {
        async function sendRequest() {
            const firstResponse = await fetch('/hamsters/random')
            const firstHamster = await firstResponse.json()
            setFirstHamster(firstHamster)
        }

        async function sendSecondRequest() {
            const secondResponse = await fetch('/hamsters/random')
            const secondHamster = await secondResponse.json()
            setSecondHamster(secondHamster)

        }
        sendRequest()
        sendSecondRequest()
    }, [])

    return (
        <div>
            <h3>May the best hamster win</h3>
        <section className="battle">
            <article className="battle-card">
                        <figure>
                            <img src={`/img/${firstHamster?.imgName}`} alt="hamster 1" />
                        </figure>
                        <h3>{firstHamster?.name}</h3>
                        <button onClick={(firstHamster && secondHamster)? () => pickWinner(firstHamster, secondHamster): undefined}>Välj {firstHamster?.name}</button>                

            </article>

            <article className="battle-card">
                        <figure>
                            <img src={`/img/${secondHamster?.imgName}`} alt="hamster 2" />                        
                        </figure>
                        <h3>{secondHamster?.name}</h3>
                        <button onClick={(secondHamster && firstHamster)? () => pickWinner(secondHamster, firstHamster): undefined}>Välj {secondHamster?.name}</button>

            </article>
         
            
        </section>
        </div>
    ) 
}

export default NewBattle;