const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '63124c22a6bbf496c6ac1d7e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui repellat cum, facere voluptate fugit tempore blanditiis obcaecati nobis, omnis mollitia a amet magnam exercitationem non voluptatem quas incidunt veritatis quia!',
            price,
            geometry: {
                type: "Point",
                coordinates: [73.854454, 18.521428]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dnzpep7pn/image/upload/v1662288699/YelpCamp/ltkzjfoofdu9wi0esvyz.jpg',
                    filename: 'YelpCamp/ltkzjfoofdu9wi0esvyz',
                },
                {
                    url: 'https://res.cloudinary.com/dnzpep7pn/image/upload/v1662288700/YelpCamp/iss5hhlhlvailxylfvgc.jpg',
                    filename: 'YelpCamp/iss5hhlhlvailxylfvgc',
                },
                {
                    url: 'https://res.cloudinary.com/dnzpep7pn/image/upload/v1662288700/YelpCamp/lkadzechbs996qnafgkt.jpg',
                    filename: 'YelpCamp/lkadzechbs996qnafgkt',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

