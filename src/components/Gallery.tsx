import { useEffect, useState } from "react"
import { Hamster } from "../models/Hamster"
import Overlay from './HamsterOverlay'
import bin from '../icons/bin.svg'




const Gallery = () => {
    const [hamsterArray, setHamsterArray] = useState<Hamster[] | null>(null)
    const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState<boolean>(false);

    const addHamster = async () => {
        
        getHamsters()
    }

    let addHamsterOverlay = null;
    if (showAddHamsterOverlay) {
        const closeOverlay = () => setShowAddHamsterOverlay(false);
        addHamsterOverlay = <Overlay close={closeOverlay} addHamster={addHamster}/>
      }

    useEffect(() => {
        getHamsters()
        
    }, [])

    let deleteHamster = async (id:string) => {
        await fetch('/hamsters/'+id, {
            method: 'DELETE'
        }) 
        getHamsters()
    }

    async function getHamsters() {
        const response = await fetch('/hamsters')
        const hamsters = await response.json()
        setHamsterArray(hamsters)
    }
    let showOverlay = () => {
        setShowAddHamsterOverlay(true)
    }
    return (
        <section className="gallery">
<button className="add-hamster-btn" onClick={showOverlay}> Lägg till ny hamster! </button>
    {addHamsterOverlay}

 <section className="grid-container">
       {hamsterArray?.map(hamster => 
            <section className="flip-card" key={hamster.id}>
                <section className="flip-card-inner">
                     <article className="hamster-card-front" >
                        <figure><img src={`/img/${hamster.imgName}`} alt={hamster.name}/></figure>
                        <h3>{hamster.name}</h3>
                     </article>
                    <article className="hamster-card-back">
                        <h2>{hamster.name}</h2>
                        <p>Ålder: {hamster.age}</p>
                        <p>Älskar: {hamster.loves}</p>
                        <p>Antal matcher: {hamster.games}</p>
                        <p>Antal vinster: {hamster.wins}</p>
                        <p>Antal förluster: {hamster.defeats}</p>
                        <p>Favvomat: {hamster.favFood}</p>
                        <button onClick={()=>deleteHamster(hamster.id)}><img src={bin} alt="bin"/></button>
                    </article> 
                </section>
            </section>

          
           
       )}
       </section>
        </section>
   
    )
}

export default Gallery;

