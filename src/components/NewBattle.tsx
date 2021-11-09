import { Hamster } from "../models/Hamster";
import {useState, useEffect} from 'react'

interface NewBattleProps {
      pickWinner: (winnerHamster:Hamster, loserHamster:Hamster) => void
}

const NewBattle = ({pickWinner}:NewBattleProps) => {

    const [firstHamster, setFirstHamster] = useState<null | Hamster>(null)
    const [secondHamster, setSecondHamster] = useState<null | Hamster>(null)


 /*    useEffect(() => {
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
    }, []) */

    useEffect(() => {
        async function sendRequest() {
            const firstResponse = await fetch('/hamsters/random')
            console.log('fetchade')

            const firstHamster = await firstResponse.json()
            setFirstHamster(firstHamster)

            const secondResponse = await fetch('/hamsters/random')
            console.log('fetchade')
            const maybeSecondHamster = await secondResponse.json()
            
            let secondHamster = maybeSecondHamster
            while (firstHamster.id === maybeSecondHamster.id) {
                console.log('det va samma')
                const secondResponse = await fetch('/hamsters/random')
                console.log('fetchade')

                const maybeSecondHamster = await secondResponse.json()
                secondHamster = maybeSecondHamster
            }

            setSecondHamster(secondHamster)
        }

       

        
        sendRequest()
        
    }, [])


    return (
        <>
            <h2>Välj den sötaste hamstern ♡</h2>
        <section className="battle">
            {(firstHamster && secondHamster)
            ? <> <article className="battle-card">
            <figure>
                
                <img src={firstHamster.imgName.includes('http') ? firstHamster.imgName : `/img/${firstHamster.imgName}` } alt="hamster 1" />
            </figure>
            <h3>{firstHamster?.name}</h3>
            <button onClick={(firstHamster && secondHamster)? () => pickWinner(firstHamster, secondHamster): undefined}>Välj {firstHamster?.name}</button>                

</article>

<article className="battle-card">
            <figure>
                <img src={secondHamster.imgName.includes('http') ? secondHamster.imgName : `/img/${secondHamster.imgName}` } alt="hamster 2" />                        
            </figure>
            <h3>{secondHamster?.name}</h3>
            <button onClick={(secondHamster && firstHamster)? () => pickWinner(secondHamster, firstHamster): undefined}>Välj {secondHamster?.name}</button>

</article> </>
            : "Laddar tävlande..."}
            
         
            
        </section>
        </>
    ) 
}

export default NewBattle;