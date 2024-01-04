const axios = require("axios");

const baseURL="http://localhost/react_wordpress/"



const WooCommerceRestApi = 
	require("@woocommerce/woocommerce-rest-api").default; 


const api = new WooCommerceRestApi({ 
	url: "http://localhost/react_wordpress/", 


	consumerKey: process.env.consumerKey, 


	consumerSecret: process.env.consumerSecret, 
	version: "wc/v3"
}); 



exports.getproducts =(req, res) => {

    api.get("products") 
    .then((response) => { 
  
      
      res.send(response.data); 
    }) 
    .catch((error) => { 
        res.send(error);  
    }); 
      
  };

  exports.createProduct = (req,res)=>{
    // Create a new product 
    
    const productData = { 
        "name": req.body.name, 
        "type": req.body.type, 
	"regular_price": req.body.regular_price, 
    "short_description":req.body.short_description,
    "description":req.body.description,
    "images":req.body.images
    }; 

  
api.post('products', productData) 
	.then((response) => { 

		res.send(response.data); 
	}) 
	.catch((error) => { 

	
		res.send(error.response.data); 
	}); 

  }

  exports.updateProduct = (req,res)=>{
    // Create a new product 
    const updatedproductData = { 
        "name": req.body.name, 
        "type": req.body.type, 
	"regular_price": req.body.regular_price, 
    "short_description":req.body.short_description,
    "description":req.body.description,
    "images":req.body.images,
    "categories":req.body.categories
    }; 

const productId =req.params.id;

api.put(`products/${productId}`,updatedproductData) 
	.then((response) => { 

		res.send(response.data); 
	}) 
	.catch((error) => { 

	
		res.send(error.response.data); 
	}); 

  }

  exports.deleteProduct = (req,res)=>{
    // Create a new product 



    const productId =req.params.id;

api.delete(`products/${productId}`) 
	.then((response) => { 

		res.send(response.data); 
	}) 
	.catch((error) => { 

	
		res.send(error.response.data); 
	}); 

  }