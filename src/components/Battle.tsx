import { Hamster } from '../models/Hamster'
import { useState } from 'react'
import ResultsOverlay from './ResultsOverlay'
import NewBattle from './NewBattle'

const Battle = () => {

    const [showResults, setShowResults] = useState<boolean>(false)
    const [winnerInfo, setWinnerInfo] = useState<Hamster | null>()
    const [loserInfo, setLoserInfo] = useState<Hamster | null>()

    const clearResults = () => {
        setShowResults(false)
        setWinnerInfo(null)
        setLoserInfo(null)
    }

    async function getUpdatedResults(winnerId: string, loserId: string) {
        const firstResponse = await fetch('/hamsters/' + winnerId)
        const winner = await firstResponse.json()
        setWinnerInfo(winner)

        const secondResponse = await fetch('/hamsters/' + loserId)
        const loser = await secondResponse.json()
        setLoserInfo(loser)
    }

    async function updateResults(winnerHamster: Hamster, loserHamster: Hamster) {

        let match = {
            winnerId: winnerHamster.id,
            loserId: loserHamster.id
        }

        let newWinnerStats = {
            wins: winnerHamster.wins + 1,
            games: winnerHamster.games + 1
        }

        let newLoserStats = {
            defeats: loserHamster.defeats + 1,
            games: loserHamster.games + 1
        }

        await fetch('/matches', {
            method: 'POST',
            body: JSON.stringify(match),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        await fetch('/hamsters/' + winnerHamster.id, {
            method: 'PUT',
            body: JSON.stringify(newWinnerStats),
            headers: {
                "Content-type": "application/json; charset=UTF-8"

            }
        })

        await fetch('/hamsters/' + loserHamster.id, {
            method: 'PUT',
            body: JSON.stringify(newLoserStats),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })





    }

    function pickWinner(winnerHamster: Hamster, loserHamster: Hamster) {
        doTheFetching(winnerHamster, loserHamster)
        setShowResults(true)
    }

    async function doTheFetching(winnerHamster: Hamster, loserHamster: Hamster) {
        await updateResults(winnerHamster, loserHamster)
        await getUpdatedResults(winnerHamster.id, loserHamster.id)
    }


    return (
        <>
            {showResults && winnerInfo && loserInfo
                ? <ResultsOverlay winner={winnerInfo} loser={loserInfo} setShowResults={clearResults} />
                : <NewBattle pickWinner={pickWinner} />}
        </>
    )
}

export default Battle;

