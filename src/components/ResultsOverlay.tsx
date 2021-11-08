import { Hamster } from "../models/Hamster";
/* import '../ResultsOverlay.css' */

interface OverlayProps {
    winner: Hamster,
    loser: Hamster,
    setShowResults: () => void
}


// not an overlay anymore lol 

const ResultsOverlay = ({ winner, loser, setShowResults }: OverlayProps) => {

    return (


        <div className="overlay">
             <button onClick={setShowResults}> Ny match</button>
            {winner && loser
                ? <>
                    <h2>And the winner is: {winner.name}!</h2>
                    <div className="results-card-container">
                        <div className="top-five-card">
                            <h3>Vinnare! </h3>
                            <figure>
                            <img src={winner.imgName.includes('http') ? winner.imgName : `/img/${winner.imgName}` } alt={winner.name} />
                            </figure>
                            <h3>{winner.name}</h3>

                            <p><span>Ålder:</span> {winner.age}</p>
                            <p><span>Antal matcher:</span> {winner.games}</p>
                            <p><span>Antal vinster:</span> {winner.wins}</p>
                            <p><span>Antal förluster:</span> {winner.defeats}</p>
                            <p><span>Älskar:</span> {winner.loves}</p>
                            <p><span>Favvomat: </span>{winner.favFood}</p>
                        </div>
                        <div className="top-five-card">
                            <h3>Förlorare!</h3>
                            <figure>
                            <img src={loser.imgName.includes('http') ? loser.imgName : `/img/${loser.imgName}` } alt={loser.name} />
                            </figure>
                            <h3>{loser.name}</h3>

                            <p><span>Ålder:</span> {loser.age}</p>
                            <p><span>Antal matcher:</span> {loser.games}</p>
                            <p><span>Antal vinster:</span> {loser.wins}</p>
                            <p><span>Antal förluster:</span> {loser.defeats}</p>
                            <p><span>Älskar:</span> {loser.loves}</p>
                            <p><span>Favvomat: </span>{loser.favFood}</p>
                        </div>
                    </div>
                   
                </>
                : <p>'Nothing to see here...'</p>}</div>
    )
}

export default ResultsOverlay;