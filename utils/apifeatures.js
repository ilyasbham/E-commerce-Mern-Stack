class ApiFeatures {
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }


    //Search for products by name
    search(){
        const keyword=this.queryString.keyword ? {
            name:{
                //regex enables flexible, partial, and case-insensitive searches.
                //For example, searching for "lap" will match "Laptop", "LAPTOP", or "lapdesk".
                $regex:this.queryString.keyword,
                //case insensitive
                $options:'i',
            }
        }:{};
        this.query=this.query.find({...keyword});
        return this;
    }


//filtering
    filter(){


        const queryCopy={...this.queryString};
        //Removing some fields for category
        //dr po ml-> products?keyword=phone&price[gte]=1000&rating[gte]=4&page=2
       //Remove keyword, page.
       
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=>delete queryCopy[key]);

        //Filtering for price and rating
        let queryStr=JSON.stringify(queryCopy);
        //Convert operators gte → $gte.
        //MongoDB uses $gte, $lte, etc., but the query from frontend is usually just gte, lte.
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);
        
        //main method is here to filter .find()
        this.query = this.query.find(JSON.parse(queryStr));

        console.log(queryStr);
        return this;
    }


//pagination
    //resultPerPage=5 ka controller ka lr ml
    pagination(resultPerPage){
        const currentPage=Number(this.queryString.page) || 1;

        //if nga do ka page 1 mr so yin currentpage ka 1 So (1-1)=0 * resultperpage ka 5->0 so skip  0
        //if nga do ka page 2 mr so yin currentpage ka 2 So (2-1)=1 * resultperpage ka 5->5 so skip  5
        //if nga do ka page 3 mr so yin currentpage ka 3 So (3-1)=2 * resultperpage ka 5->10 so skip  10


       const skip=resultPerPage * (currentPage - 1);

       //main method is here to pagination .limit().skip()
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }




}

module.exports=ApiFeatures;