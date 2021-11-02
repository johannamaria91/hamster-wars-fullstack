/* import './Overlay.css'; */
import { useState } from "react";

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
    const [nameIsTouched, setNameIsTouched] = useState<boolean>(false)
    const [ageIsTouched, setAgeIsTouched] = useState<boolean>(false)
    const [lovesIsTouched, setLovesIsTouched] = useState<boolean>(false)
    const [favFoodIsTouched, setFavFoodIsTouched] = useState<boolean>(false)
    const [imgNameIsTouched, setImgNameIsTouched] = useState<boolean>(false)



    const handleAddHamster = async () => {
        let newHamster = { name: name, age: age, games: games, wins: wins, defeats: defeats, loves: loves, favFood: favFood, imgName: imgName }
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

    const nameIsValid = isValidName(name)
	const nameClass = nameIsValid && nameIsTouched ? 'valid' : nameIsTouched ? 'invalid' : '';

	const ageIsValid = isValidAge(age)
    const ageClass = ageIsValid && ageIsTouched ? 'valid' : ageIsTouched ? 'invalid' : '';

    const lovesIsValid = isValidLoves(loves)
    const lovesClass = lovesIsValid && lovesIsTouched ? 'valid' : lovesIsTouched ? 'invalid' : '';

    const foodIsValid = isValidFood(favFood)
    const foodClass = foodIsValid && favFoodIsTouched ? 'valid' : favFoodIsTouched ? 'invalid' : '';

    const imgIsValid = isValidImg(imgName)
    const imgClass = imgIsValid && imgNameIsTouched ? 'valid' : imgNameIsTouched ? 'invalid' : '';

    const formIsValid = nameIsValid && ageIsValid && lovesIsValid && foodIsValid && imgIsValid

    return (
        <div className="add-hamster-overlay">

            <div className="form">
            <button className="close-btn" onClick={close}>✖️</button>
            <h2>Lägg till ny hamster</h2>
                <section className="input-container">
                    <input type="text" /* placeholder="Hamsterns namn"  */
                        value={name}
                        onChange={event => setName(event.target.value)} className={nameClass} onClick={() => setNameIsTouched(true)}/>
                    <label className='filled'> Hamsterns namn </label>
                </section>

                <section className="input-container">
                    <input type="number" /* placeholder="Hamsterns ålder"  */
                        value={age}
                        min="0"
                        onChange={event => setAge(Number(event.target.value))} className={ageClass} onClick={() => setAgeIsTouched(true)}/>
                    <label className='filled'> Hamsterns ålder </label>
                </section>

                <input type="hidden" placeholder="Antal matcher..."
                    value={games}
                    onChange={event => setGames(event.target.valueAsNumber)} />

                <input type="hidden" placeholder="Antal vinster..."
                    value={wins}
                    onChange={event => setWins(event.target.valueAsNumber)} />

                <input type="hidden" placeholder="Antal förluster..."
                    value={defeats}
                    onChange={event => setDefeats(event.target.valueAsNumber)} />

                <section className="input-container">
                    <input type="text" /* placeholder="Hamstern älskar att..."  */
                        value={loves}
                        onChange={event => setLoves(event.target.value)} className={lovesClass} onClick={() => setLovesIsTouched(true)}/>
                    <label className='filled'> Hamstern älskar att... </label>
                </section>

                <section className="input-container">
                    <input type="text" /* placeholder="Hamsterns favoritmat"  */
                        value={favFood}
                        onChange={event => setFavFood(event.target.value)} className={foodClass} onClick={() => setFavFoodIsTouched(true)}/>
                    <label className='filled'> Hamsterns favoritmat </label>
                </section>

                <section className="input-container">
                    <input type="text" /* placeholder="Bild på hamstern..."  */
                        value={imgName}
                        onChange={event => setImgName(event.target.value)} className={imgClass} onClick={() => setImgNameIsTouched(true)}/>
                    <label className='filled'> Bild på hamstern... </label>
                </section>

                <button type="submit" onClick={handleAddHamster} disabled={!formIsValid}>Lägg till hamster</button>

                

            </div>

        </div>
    )

}

function isValidName(name: string): boolean {
	return name.length >= 2
}
function isValidAge(age: number): boolean {
	if( isNaN(age) ) return false
	if( age < 0 ) return false
	let ageString = String(age)
	if( ageString.includes(',') || ageString.includes('.') ) return false
	return true
}

function isValidLoves(loves: string): boolean {
	return loves.length >= 2
}

function isValidFood(food: string): boolean {
	return food.length >= 2
}

function isValidImg(imgName: string): boolean {
	return imgName.length >= 2
}
export default Overlay