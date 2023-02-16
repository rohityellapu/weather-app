import React, { useState } from 'react'

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
                <form onSubmit={ handleSubmit } className='flex justify-center items-center gap-6 m-4'>
                    <input type="text" value={ item } onChange={ (e) => setItem(e.target.value) } placeholder='Add favorites' className='p-4 border-none rounded-lg focus:outline-green-100 ' />
                    <input type="submit" value="Add" className='p-2 rounded-md bg-blue-500 m-2' />
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