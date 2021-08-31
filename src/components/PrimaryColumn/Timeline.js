import React from 'react'
import Tweet from './Tweet'


export default function Timeline({ tweets }) {
    return (
        <div>
            {
                tweets &&
                
                <>
                    {tweets.map((tweet,i) => 
                        <Tweet tweet={tweet} key={i}/>
                    )}
                    
                    <div style={{height: '30vh'}}></div>
                </>
                
                
            }
        </div>
    )
}
