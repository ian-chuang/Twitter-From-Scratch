import React from 'react'
import Tweet from './Tweet'


export default function Feed({ tweets }) {
    return (
        <div>
            {tweets && 
            
            tweets.map((tweet) => 
                <Tweet tweet={tweet}/>
            )}
        </div>
    )
}
