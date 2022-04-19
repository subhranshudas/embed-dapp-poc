import React from 'react';


const list = [1, 2, 3, 4, 5];

const Notifications = () => {
    return (
        <div>
            {list.map((n) => {
             return <span>{n}</span>
            })}
        </div>
    );
};

export default Notifications;