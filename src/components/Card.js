import React from 'react'

const Card = ({name}) => {
    return (
        <div>
            <div className = "row" >
                            <tbody>
              {name.map(item => {
                return (
                  <tr>
                    <td key={item.id}>{item.userId}</td>
                    <td key={item.id}>{item.id}</td>
                    <td key={item.id}>{item.title}</td>
                    <td key={item.id}>{item.completed}</td>
                  </tr>
                )
              })}
            </tbody>
                    
                </div>
        </div>
    )
}

export default Card