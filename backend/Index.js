const mongoose = require('mongoose');
const connectUrl = "mongodb+srv://sultantutorial2001:xJqtRuE9fsypyQMB@cluster0.uf9pbo7.mongodb.net/?retryWrites=true&w=majority";

const MongoDB = async () => {
  try {
    await mongoose.connect(connectUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected");
  
    const food_itemsdata = mongoose.connection.db.collection("food_items");
  
    let obj = await food_itemsdata.find({}).toArray();
    if (obj.length > 0) {
      global.food_items=obj;
      const foodCategory = mongoose.connection.db.collection("Food_Category");
      let CategoryObj = await foodCategory.find({}).toArray();
      if(CategoryObj.length>0){
        // console.log(CategoryObj);
        global.foodCategoryitems=CategoryObj;
      }
      else{
        console.log("No data found in 'food Category' collection");
      }
      // console.log(food_items);
     
    } else {
      console.log("No data found in the 'food_items' collection.");
    }
  }
  catch (error) {
    console.error("Error connecting to MongoDB or fetching data:", error);
  }
  
};

module.exports = MongoDB;

