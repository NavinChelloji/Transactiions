const products=require('../Model/products.model')
const range=["0-100","100-200","200-300","300-400","400-500","500-600","600-700","700-800","800-900","900 above"]
async function searchMonth(req,res){
   
    try{
       if(req.headers.month==0){
        res.json(await products.find({$or:[{'title': { '$regex': req.headers.search, '$options': 'i' }},
        {'description':{ '$regex': req.headers.search, '$options': 'i' }},
        {"convertedPrice":{ '$regex': req.headers.search, '$options': 'i' }}

    ]}).skip(req.headers.page*10).limit(10))
    
    }
    
    else{
        res.json(await products.aggregate([
            {
                $addFields:{
                            convertedDate:{$toDate:"$dateOfSale"},
                            convertedPrice: { $toString: "$price" },
                            
                            }
            },
            {
                $addFields:{
                    month:{$month:"$convertedDate"}

                }
            },
            {
                $match:{"month":+req.headers.month}
            },{
                $match:{
                    $or:[{'title': { '$regex': req.headers.search, '$options': 'i' }},
                        {'description':{ '$regex': req.headers.search, '$options': 'i' }},
                        {"convertedPrice":{ '$regex': req.headers.search, '$options': 'i' }}

                    ]
                    
                }
            },
            {
                $skip:req.headers.page*10 
             },{
                 $limit:10
             }
            

        ]))
    }



}
catch(err){
        console.log(err)
        res.json(err)
    }

}
async function selectedMonth(req,res){

   const selectedMonth= await products.aggregate([
        {
            $addFields:{
                        convertedDate:{$toDate:"$dateOfSale"}
                        }
        },
        {
            $addFields:{
                month:{$month:"$convertedDate"}

            }
        },
        {
            $match:{"month":+req.headers.month}
        }
        

    ])
let totalSale=0

let barChart=[["range","count"]]
let pieChart={}
for(let i of range){
  
    barChart.push([i,0])
}
   const soldItems= selectedMonth.reduce((x,product)=>{
            if(product.sold===true){
                totalSale=totalSale+product.price
                x++
            }
            const index=Math.floor(product.price/100)>9?9:Math.floor(product.price/100)
            

            barChart[index+1][1]++
            if(pieChart[`${product.category}`]===undefined)
                pieChart[`${product.category}`]=1;
            else
            pieChart[`${product.category}`]++


            return x
    },0)

  
   
    res.json({"sold":soldItems,"notSold":selectedMonth.length-soldItems,"sale":totalSale,"barChart":barChart,"pieChart":pieChart})

}
module.exports={searchMonth,selectedMonth}
