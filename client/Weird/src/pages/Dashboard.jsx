import React from 'react'

const dashboard = ({setAuth}) => {
  return (
    <div>
       <h1>Welcome to the dashboard</h1>
    <button onClick={()=>setAuth(false)}></button>
    </div>
   
  )
}

export default dashboard