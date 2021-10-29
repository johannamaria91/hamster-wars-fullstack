import {useState, useEffect} from 'react';
import { Hamster } from '../models/Hamster'


const StartPage = () => {
    const [data, setData] = useState<null | Hamster[]>(null)

    useEffect(() => {
        async function sendRequest() {
        const response = await fetch('/hamsters/cutest')
        const data = await response.json()
        setData(data)
      }
          sendRequest()
      }, [])

    
    return (
        <>
        <h2>Hjälp oss att kora den sötaste hamstern!</h2>
        <p>Gå till tävlings-fliken och välj den sötaste hamstern.</p>
        <p>I galleriet hittar du alla tävlande hamstrar och kan se all info om dem</p>
       
       {data?.map(cutesthamster =>
       <section className="cutest-hamster" key="cutest">
          <h3>The cutest hamster right now is: </h3>
          <h2>{cutesthamster.name}</h2>
          <img src={`/img/${cutesthamster.imgName}`} alt="cutest hamster"/>
          </section>
      ) }
   </>
       )
       

}

export default StartPage;