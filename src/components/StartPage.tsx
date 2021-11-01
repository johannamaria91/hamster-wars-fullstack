import { useState, useEffect } from 'react';
import { Hamster } from '../models/Hamster'


const StartPage = () => {
    const [cutestHamster, setCutestHamster] = useState<Hamster>()

    useEffect(() => {
        async function sendRequest() {
            const response = await fetch('/hamsters/cutest')
            const data = await response.json()


            if (data && data.length > 1) {
                setCutestHamster(data[Math.floor(Math.random() * data.length)])
            } else if (data && data.length === 1) {
                setCutestHamster(data)
            }
        }

        sendRequest()
    }, [])




    return (
        <>
            <h2>Hjälp oss att kora den sötaste hamstern!</h2>
            <p>Gå till tävlings-fliken och välj den sötaste hamstern.</p>
            <p>I galleriet hittar du alla tävlande hamstrar och kan se all info om dem</p>


            <section className="cutest-hamster" key="cutest">
                <h3>The cutest hamster right now is: </h3>
                <h2>{cutestHamster?.name}</h2>
                <img src={`/img/${cutestHamster?.imgName}`} alt="cutest hamster" />
            </section>
        </>
    )


}

export default StartPage;