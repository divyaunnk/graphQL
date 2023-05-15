import express from "express";
import dotenv from "dotenv";
import {graphqlHTTP} from "express-graphql";
import schema from "./schema/schema.js";

dotenv.config();

const port = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(port, () => {
    console.log(`Server started on port ${port}` );
});