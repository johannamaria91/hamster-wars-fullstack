import { Hamster } from "../models/Hamster";
import {useState, useEffect} from 'react'
/* import '../ResultsOverlay.css' */

interface OverlayProps {
    winner: Hamster,
    loser: Hamster,
    setShowResults: (param: boolean) => void
}


// not an overlay anymore lol 

const ResultsOverlay = ({ winner, loser, setShowResults}:OverlayProps) => {
 
    return(
        
        
        <div className="overlay">
           {winner && loser ? 
           <div>
           <h2>And the winner is... {winner.name}</h2>
            <div>
                <h3>Vinnare! </h3>
                <img src={`/img/${winner.imgName}`} alt={winner.name}/>
                <ul>
                    <li>Namn: {winner.name}</li>
                    <li>Ålder: {winner.age}</li>
                    <li>Antal matcher: {winner.games}</li>
                    <li>Antal vinster: {winner.wins}</li>
                    <li>Antal förluster: {winner.defeats}</li>
                    <li>Älskar: {winner.loves}</li>
                    <li>Favoritmat: {winner.favFood}</li>
                </ul>
            </div>
            <div>
                <h3>Förlorare!</h3>
                <img src={`/img/${loser.imgName}`} alt={loser.name}/>
                <ul>
                    <li>Namn: {loser.name}</li>
                    <li>Ålder: {loser.age}</li>
                    <li>Antal matcher: {loser.games}</li>
                    <li>Antal vinster: {loser.wins}</li>
                    <li>Antal förluster: {loser.defeats}</li>
                    <li>Älskar: {loser.loves}</li>
                    <li>Favoritmat: {loser.favFood}</li>
                </ul>
            </div>

            <button onClick={event => setShowResults(false)}> Ny match</button>
            </div>
       : <p>'Nothing to see here...'</p>   }</div>
    )
}

export default ResultsOverlay;