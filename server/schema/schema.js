import graphql from "graphql";
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        }
    })

});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            agrs: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {

            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});