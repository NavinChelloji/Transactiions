import React from 'react'

function TableRow({product}) {
  
  return (
    <tr>
        <td>{product.id}</td>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.category}</td>
        <td>{product.sold?"True":"False"}</td>
        <td><img src={product.image} style={{
            width:"50px",
            height:"50px"
        }}></img></td>
    </tr>
  )
}

export default TableRow