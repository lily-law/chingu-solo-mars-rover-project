# Mars Photo API

Web app to search and view photos taken by mars rovers. A [Chingu solo project](https://github.com/chingu-voyages/soloproject-tier3-mars-photos).

[Live Demo](https://chingu-solo-mars-rover-api.herokuapp.com/)

## Features
- Search photos from rovers Curiosity/Opportunity/Spirit
- Search by Sol (Martian rotation or day counting up from the rover's landing date)
- Filter by rover cameras
- Infinite scrolling
- Status display
- Modal view on photos
- Sol input automatically converts to closest sol with data
- Camera selection show only cameras with data for given sol
- Live feedback on number of photos for give sol
- Images are fetched on being viewed
- Fully responsive design
- Back to top button

-----

## Development setup 

1. Clone this repo
1. Get an API key https://api.nasa.gov/index.html#apply-for-an-api-key
1. Make .env file in project root: 

.env
```
NASA_API_KEY=YOUR_KEY_HERE
```

### Install 
```
npm install -g nodemon
npm install
npm run client-install

```

# Run
```
npm run dev
```

## Contributing
Pull requests are welcome.