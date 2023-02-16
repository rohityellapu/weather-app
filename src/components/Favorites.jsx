import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Favorites() {
    let weathData = JSON.parse(localStorage.getItem('weather'));
    let [favData, setWeathData] = useState(weathData?.favorites);
    let [item, setItem] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        let newFav = { name: item, data: null };
        setWeathData(prev => (
            [...prev, newFav]
        ))
        weathData.favorites.push(newFav);
        localStorage.setItem('weather', JSON.stringify(weathData))
        setItem('');
    }
    return (
        <>
            <div className=" m-4 p-4">
                <Link to='/search' className='bg-cyan-400 rounded-xl text-xl text-center p-2 my-2 block hover:saturate-200 active:scale-95'>Get weather by Search<img className='h-6 w-6 mx-2 inline' src="https://img.icons8.com/ios-glyphs/256/search.png" alt="" /></Link>
                <form onSubmit={ handleSubmit } className='flex justify-center items-center gap-6 m-4'>
                    <input type="text" value={ item } onChange={ (e) => setItem(e.target.value) } placeholder='Add favorites' className='p-3 border-none rounded-lg focus:outline-green-100 ' />
                    <input type="submit" value="Add" className='p-2 px-4 hover:saturate-200 active:scale-95 rounded-md bg-blue-500 m-2' />

                </form>
                <div className="favorites flex flex-wrap">
                    { favData?.map((fav, i) => (
                        <div key={ fav.name + i } className='bg-green-900 text-green-100 p-4 rounded-lg m-2'>
                            <p>{ fav.name }</p>
                        </div>

                    )) }
                </div>

            </div>
        </>
    )
}

export default Favorites