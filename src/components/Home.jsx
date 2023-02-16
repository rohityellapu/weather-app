import React, { useEffect, useState } from 'react'
import axios from "axios";
import Weather from './Weather';
import Favorites from './Favorites';

const apiURL = "https://api.weatherapi.com/v1/current.json?key=ab45924f6c734aa9ab391639231602&q=";
function Home() {

    const [currCords, setcurrCords] = useState('')

    function promptLocation() {

        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        console.log(result.state);
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition((pos) => {
                            console.log(pos.coords);
                            const { coords } = pos;
                            setcurrCords(coords.latitude + ',' + coords.longitude)
                            let weathData = { currLocation: '', favorites: [] }
                            weathData.currLocation = coords.latitude + ',' + coords.longitude;

                            localStorage.setItem('weather', JSON.stringify(weathData))

                        });
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition((pos) => {
                            console.log(pos.coords);
                            const { coords } = pos;
                            setcurrCords(coords.latitude + ',' + coords.longitude)
                            let weathData = { currLocation: '', favorites: [] }
                            weathData.currLocation = coords.latitude + ',' + coords.longitude;

                            localStorage.setItem('weather', JSON.stringify(weathData))

                        });
                        console.log(result.state);
                    } else if (result.state === "denied") {
                        //If denied then you have to show instructions to enable location
                    }
                    result.onchange = function () {
                        console.log(result.state);
                    };
                });
        } else {
            alert("Sorry Not available!");
        }
    }


    useEffect(() => {
        let weathData = JSON.parse(localStorage.getItem('weather'))
        if (weathData) {

            setcurrCords(weathData.currLocation)

        }
        else {
            promptLocation();

        }



    }, [currCords])

    return (
        <div className={ `h-screen bg-amber-100` }>
            { currCords == '' && <div className="p p-5 rounded-lg m-2 text-xl font-semibold text-center text-red-400">You need enable location to see local weather</div> }

            <Weather location={ currCords } />
            <Favorites />
        </div>
    )
}

export default Home