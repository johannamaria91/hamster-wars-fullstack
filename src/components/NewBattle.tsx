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
            <h2>{firstHamster?.name}</h2>
            <img src={`/img/${firstHamster?.imgName}`} alt="hamster 1" />
            <button onClick={(firstHamster && secondHamster)? () => pickWinner(firstHamster, secondHamster): undefined}>Välj {firstHamster?.name}</button>                
            <h2>{secondHamster?.name}</h2>
            <img src={`/img/${secondHamster?.imgName}`} alt="hamster 2" />
            <button onClick={(secondHamster && firstHamster)? () => pickWinner(secondHamster, firstHamster): undefined}>Välj {secondHamster?.name}</button>
        </div>
    ) 
}

export default NewBattle;