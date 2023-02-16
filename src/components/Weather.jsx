import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from './Loading';

const apiURL = "https://api.weatherapi.com/v1/current.json?key=ab45924f6c734aa9ab391639231602&q=";

function Weather({ location }) {
    const [weather, setWeather] = useState({})
    const [col, setColor] = useState('rgb(0,0,0)')
    const [load, setloading] = useState(false)
    async function getWeather(loc) {
        setloading(true);
        await axios.get(apiURL + loc).then((res) => {
            console.log(res.data);
            setWeather(res.data)
            let temp = res.data.current.temp_c
            let color = 'rgba(244,244,244,0.4)'

            if (temp > -10 && temp <= 0) {
                color = 'rgba(50,97,214, 0.4)'
            } else if (temp > 1 && temp <= 15) {
                color = 'rgba(244,244,244, 0.4)'
            } else if (temp > 16 && temp <= 25) {
                color = 'rgba(244,204,0, 0.4)'
            } else if (temp > 26) {
                color = 'rgba(216,128,48, 0.4)'
            };
            setColor(color);
        }).catch(console.log)
        setloading(false);
    }

    useEffect(() => {

        getWeather(location);


    }, [location])
    return (
        <>
            { load ? <Loading /> :
                <div className="currentWeather p-5 rounded-b-3xl shadow-xl shadow-gray-100 text-center text-white flex flex-col justify-center items-center" style={ { backgroundColor: col } }>
                    <h1 className='text-6xl m-5'>{ weather?.location?.name }</h1>
                    <h2 className='text-xl'>{ weather?.location?.region + ", " + weather?.location?.country }</h2>
                    <div className="temp m-5">

                        <p className='text-8xl font-bold inline-block'>{ weather?.current?.temp_c }<sup>o</sup></p><span className='text-8xl font-bold'>C</span>
                    </div>
                    <p className='font-bold'>Feels like { weather?.current?.feelslike_c }</p>
                    <img className='' src={ weather?.current?.condition?.icon } alt="" />
                    <p className='text-3xl'>{ weather?.current?.condition?.text }</p>

                </div>
            }
        </>
    )
}

export default Weather