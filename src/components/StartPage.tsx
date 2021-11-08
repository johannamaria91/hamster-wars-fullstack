import { useState, useEffect } from 'react';
import { Hamster } from '../models/Hamster'


const StartPage = () => {
    const [cutestHamster, setCutestHamster] = useState<Hamster[] | null>(null)

try {
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
} catch (error) {
    console.log('o damn')
}

    



    return (

    
        <section className="startpage">
            <h2>Hjälp oss att kora den sötaste hamstern!</h2>
            <p>I Hamster Wars är det DU som bestämmer!</p>
            <p>Två hamstrar slumpas fram och du väljer vilken du tycker är sötast, vilket ger hamstern ett poäng</p>
            <p>Under statistik kan du se vilka 5 hamstrar som vunnit flest matcher, och även vilka 5 som förlorat flest.</p>
            <p>På historik-fliken kan du se alla matcher och även söka på en specifik hamster för att se alla dess matcher.</p>
            <p>I galleriet hittar du alla tävlande hamstrar och kan se all info om dem. Du kan även klicka för att se alla hamstrar hamstern vunnit mot!</p>

        {
            cutestHamster?.map(hamster => 
                 <section className="cutest-hamster" key="cutest">
                <h3>Sötaste hamstern just nu: </h3>
                <figure><img src={hamster.imgName.includes('http') ? hamster.imgName : `/img/${hamster.imgName}` } alt="cutest hamster" /></figure>
                <h2>{hamster.name}</h2>
            </section>
                
                )
        }
           
        </section>
    )


}

export default StartPage;