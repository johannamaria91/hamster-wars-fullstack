import { useState, useEffect } from 'react';
import { Hamster } from '../models/Hamster'


const StartPage = () => {
    const [cutestHamster, setCutestHamster] = useState<Hamster[] | null>(null)

    useEffect(() => {
         async function sendRequest() {
        const response = await fetch('/hamsters/cutest')
        const data = await response.json()


        if (data && data.length > 1) {
            setCutestHamster([data[Math.floor(Math.random() * data.length)]])
        } else if (data && data.length === 1) {
            setCutestHamster([data[0]])
        }
    }

        sendRequest()
    }, [])


   

  


    return (
        <section className="startpage">
            <h2>Hjälp oss att kora den sötaste hamstern!</h2>
            <p>Gå till tävlings-fliken och välj den sötaste hamstern.</p>
            <p>I galleriet hittar du alla tävlande hamstrar och kan se all info om dem</p>

        {
            cutestHamster?.map(hamster => 
                 <section className="cutest-hamster" key="cutest">
                <h3>The cutest hamster right now is: </h3>
                <h2>{hamster.name}</h2>
                <figure><img src={`/img/${hamster.imgName}`} alt="cutest hamster" /></figure>
                
            </section>
                
                )
        }
           
        </section>
    )


}

export default StartPage;