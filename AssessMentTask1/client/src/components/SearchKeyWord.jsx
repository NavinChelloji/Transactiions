import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import TableRow from './TableRow'
const allMonths=['All Months','Jan','Feb',"Mar","Apr","May","Jun",'July',"Aug","Sept","Oct","Nov","Dec"]
function SearchKeyWord({month,setMonth}) {
    const [products,setProducts]=useState([])
    const [searchKeyWord,setSearchKeyWord]=useState("")
    const [pages,setPages]=useState(0)
    
    useEffect(()=>{
    
        (async ()=>{
          const responce=await axios.get('http://localhost:5000/month',{"headers":{"page":pages,"search":searchKeyWord,"month":month}})
         
          setProducts(responce.data)
          console
         
    
        })()
     
      },[pages,searchKeyWord,month])
      function handleSearchKeyWord(event){
        setPages(0)
        setSearchKeyWord(event.target.value)
    
    
    
    
      }
      function handlePages(Index){
        setPages((prev)=>{
          if((Index===-1 && prev===0)|| (Index===1 &&products.length<10)){
            return prev
          }
          return prev+Index
        });
    
      }
      function handleMonth(event){
        setMonth(event.target.value)
        setPages(0)
        
        
      
    
      }
  return (<>
    <div className='searchContainer'>
    <input placeholder="Search" onChange={handleSearchKeyWord} value={searchKeyWord}></input>
    <select onChange={handleMonth} defaultValue={3}>
      {
        allMonths.map((month,index)=>{
          return <option value={index} key={month}>{month}</option>
        })
      }
      
    </select>
    </div>
    <table>
    <thead>
      <tr>
        <td>ID</td>
        <td>Title</td>
        <td>Description</td>
        <td>price</td>
        <td>Category</td>
        <td>Sold</td>
        <td>Image</td>
      </tr>
    </thead>
    <tbody>
      {products.map((product)=>{
        return <TableRow product={product} key={product._id}></TableRow>
      })}
    </tbody>
  </table>
  <div className='pages'>
  <button onClick={()=>handlePages(-1)} disabled={pages===0}>prev</button>
  <button onClick={()=>handlePages(1)} disabled={products.length!==10}>next</button>
  </div>
  </>
  )
}

export default SearchKeyWord