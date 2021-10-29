/* import './Overlay.css'; */
import { addHamsterObject } from '../models/AddHamsterObject';
import {useState} from "react";

interface OverlayProps {
    close: () => void;
    addHamster: (hamster: addHamsterObject) => void;
}

const Overlay = ({ close, addHamster }: OverlayProps) => {
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [games, setGames] = useState<number>(0)
    const [wins, setWins] = useState<number>(0)
    const [defeats, setDefeats] = useState<number>(0)
    const [loves, setLoves] = useState<string>('')
    const [favFood, setFavFood] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    

    const handleAddHamster = () => {
        let hamster: addHamsterObject = {name: name, age: age, games: games, wins: wins, defeats: defeats, loves: loves, favFood: favFood, imgName: imgName}
        addHamster(hamster)
        close()
    }

    return (
        <div className="add-hamster-overlay">
        Overlay!
        <div className="dialog">
            <input type="text" placeholder="Hamsterns namn" 
            value={name} 
            onChange={event => setName(event.target.value)}/>
            <input type="number" placeholder="Hamsterns ålder" 
            value={age} 
            onChange={event => setAge(event.target.valueAsNumber)}/>
            <input type="hidden" placeholder="Antal matcher..." 
            value={games} 
            onChange={event => setGames(event.target.valueAsNumber)}/>
             <input type="hidden" placeholder="Antal vinster..." 
            value={wins} 
            onChange={event => setWins(event.target.valueAsNumber)}/>

            <input type="hidden" placeholder="Antal förluster..." 
            value={defeats} 
            onChange={event => setDefeats(event.target.valueAsNumber)}/>

            <input type="text" placeholder="Hamstern älskar..." 
            value={loves} 
            onChange={event => setLoves (event.target.value)}/>

            <input type="text" placeholder="Hamsterns favoritmat" 
            value={favFood} 
            onChange={event => setFavFood (event.target.value)}/>

            <input type="text" placeholder="Bild på hamstern..." 
            value={imgName} 
            onChange={event => setImgName (event.target.value)}/>

            <button type="submit" onClick={handleAddHamster}>Lägg till hamster</button>

        <br />
    <button  onClick={close}>Close</button>

        </div>
    
    </div>
    )
 
}

export default Overlay