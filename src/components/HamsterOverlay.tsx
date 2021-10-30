/* import './Overlay.css'; */
import {useState} from "react";

interface OverlayProps {
    close: () => void;
    addHamster: () => void;
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
    

    const handleAddHamster = async () => {
        let hamster = {name: name, age: age, games: games, wins: wins, defeats: defeats, loves: loves, favFood: favFood, imgName: imgName}
        const newHamster = hamster;
        const response = await fetch('/hamsters', {
            method: 'POST',
            body: JSON.stringify(newHamster),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const newArray = await response.json()
        addHamster()
        close()
    }

    return (
        <div className="add-hamster-overlay">
        
        <form>
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

        </form>
    
    </div>
    )
 
}

export default Overlay