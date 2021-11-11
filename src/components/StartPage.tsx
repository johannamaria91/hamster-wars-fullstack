import { useState, useEffect } from 'react';
import { Hamster } from '../models/Hamster'


const StartPage = () => {
    const [cutestHamster, setCutestHamster] = useState<Hamster[] | null>(null)
    const [errorExists, setErrorExists] = useState<boolean>(false)


    useEffect(() => {
        async function sendRequest() {
            try {
                const response = await fetch('/hamsters/cutest')
                

                const data = await response.json()


                if (data && data.length > 1) {
                    setCutestHamster([data[Math.floor(Math.random() * data.length)]])
                } else if (data && data.length === 1) {
                    setCutestHamster([data[0]])
                }
            } catch (error) {
                console.log(error)
                setErrorExists(true)
            }

        }

        sendRequest()
    }, [])






    return (


        <section className="startpage">
            {!errorExists ? 
            <>
              {
                cutestHamster ? 
                cutestHamster.map((hamster:Hamster) =>
                    <section className="cutest-hamster" key="cutest">
                        <h3>Sötaste hamstern just nu: </h3>
                        <figure><img src={hamster.imgName.includes('http') ? hamster.imgName : `/img/${hamster.imgName}`} alt="cutest hamster" /></figure>
                        <h2>{hamster.name}</h2>
                    </section>

                ) 
                : <section className="cutest-hamster"> <p>Laddar sötaste hamstern</p></section>
            } </>
            : <section className="cutest-hamster">  <h3>Just nu kan vi inte nå den sötaste hamstern. Försök igen om en liten stund.</h3> </section>
        }
            <h2>Hjälp oss att kora den sötaste hamstern!</h2>
                            <p>I Hamster Wars är det DU som bestämmer!</p>

            <section className="start-info">
                <article><aside>1</aside>
                <p>Två hamstrar slumpas fram och du väljer vilken du tycker är sötast, vilket ger hamstern ett poäng</p>

                </article>
                <article><aside>2</aside>
                <p> Under statistik kan du se vilka 5 hamstrar som vunnit flest matcher, och även vilka 5 som förlorat flest.</p>

                </article>
                <article><aside>3</aside>
                <p> På historik-fliken kan du se alla matcher och även söka på en specifik hamster för att se alla dess matcher.</p>

                </article>
                <article><aside>4</aside>
                <p>I galleriet hittar du alla tävlande hamstrar och kan se all info om dem. Du kan även klicka för att se alla hamstrar hamstern vunnit mot!</p>

                </article>

            </section>
            
          

        </section>
    )


}

export default StartPage;