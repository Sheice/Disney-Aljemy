import app from "./app.js";


app.listen(app.get('PORT'));

console.log(`Server listening on port ${app.get('PORT')}`);