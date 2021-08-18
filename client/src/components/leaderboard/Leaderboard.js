import React, { useState } from "react";

const CustomLeaderboard = ({ users, paginate }) => {
    const [start, setStart] = useState(0);
    const [page, setPage] = useState(1);

    const next = () => {

        setStart(start + 5);
        setPage(page + 1);
    }
    const prev = () => {
        if (start !== 0) {

            setStart(start - 5);
            setPage(page - 1);
        }
    }

    const result = () => {
        return (

            users.slice(start, start + paginate).map((element, index) => {
                console.log(element.name);
                return (
                    <div className='rankers'>
                        <div className='rank'>
                            {start + index + 1}
                        </div>
                        <div className='avatar'>
                            <img alt='' src={element.avatar} />
                        </div>
                        <div className='name'> {element.name}</div>
                        <div className='score'> {element.score}</div>
                    </div>

                )
            })
        )

    }



    return (
        <>
            <div id="mainD">
                <div id='leaderboard'>
                    <div id='title'>
                        👑 LeaderBoard 👑
                    </div>
                    {result()}
                </div>
                <div id='control'>
                    <button className='cb' onClick={prev} disabled={start === 0}>
                        Prev
                    </button>
                    <div id='page' >{page}</div>
                    <button className='cb' onClick={next} disabled={start + 5 >= users.length}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default CustomLeaderboard;