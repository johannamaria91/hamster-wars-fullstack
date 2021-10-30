import { useEffect, useState } from "react"
import { Hamster } from "../models/Hamster"

const Statistics = () => {
    const [winnersArray, setWinnersArray] = useState<null | Hamster[]>(null)
    const [losersArray, setLosersArray] = useState<null | Hamster[]>(null)


    useEffect(() => {
        async function sendRequest() {
            const firstResponse = await fetch('/winners')
            const winnersArray = await firstResponse.json()
            setWinnersArray(winnersArray)

            const secondResponse = await fetch('/losers')
            const losersArray = await secondResponse.json()
            setLosersArray(losersArray)
        }
        sendRequest()
    }, [])

    return (
        <div className="top-five">
            <section className="winners">  <h2>Top 5 most wins</h2>
                {winnersArray?.map(hamster =>
                    <article key={hamster.id} className="top-five-card">
                        <figure>
                            <img src={`/img/${hamster.imgName}`} alt={hamster.name} />
                        </figure>
                        <h3>{hamster.name}</h3>
                        <p><span>Ålder:</span> {hamster.age}</p>
                        <p><span>Antal matcher:</span> {hamster.games}</p>
                        <p><span>Antal vinster:</span> {hamster.wins}</p>
                        <p><span>Antal förluster:</span> {hamster.defeats}</p>
                        <p><span>Älskar:</span> {hamster.loves}</p>
                        <p><span>Favvomat: </span>{hamster.favFood}</p>
                    </article>)}
            </section>

            <section className="losers">  <h2>Top 5 most defeats</h2>
                {losersArray?.map(hamster => 
                <article key={hamster.id} className="top-five-card">
                    <figure>
                        <img src={`/img/${hamster.imgName}`} alt={hamster.name} />
                    </figure>
                    <h3>{hamster.name}</h3>
                    <p><span>Ålder:</span> {hamster.age}</p>
                    <p><span>Antal matcher: </span>{hamster.games}</p>
                    <p><span>Antal vinster:</span> {hamster.wins}</p>
                    <p><span>Antal förluster:</span> {hamster.defeats}</p>
                    <p><span>Älskar:</span> {hamster.loves}</p>
                    <p><span>Favvomat: </span>{hamster.favFood}</p>
                </article>)}
            </section>


        </div>
    )
}

export default Statistics