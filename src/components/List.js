import React from 'react'

const List = ({data}) => {
    return (
        <div>
            <tbody>
              {data.map(item => {
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
    )
}

export default List
