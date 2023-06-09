import graphql, {
    GraphQLID,
    GraphQLInt,
    GraphQLList
} from "graphql";
import _ from "lodash";

// import bookModel from "../models/book-model";
import authorModel from "../models/author-model.js";
import bookModel from "../models/book-model.js";
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent,arg) {
                console.log(parent)
                return _.find(authors, { 
                    id: parent.authorId
                })
            }
        }
        
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                return _.filter(books, {
                    authorId: parent.id
                })
            }
        }
        
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(books, {
                    id: args.id
                });
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return _.find(authors, {
                    id: args.id
                });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args)  {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString },
                age: {type: GraphQLInt}
            },
            resolve(parent,args){
                let author = new authorModel({
                    name: args.name,
                    age: args.age
                });
                console.log(author)
                return author.save();
            }
        },
        addBook: {
           type: BookType,
           args: {
            name: {type: GraphQLString},
            genre: {type: GraphQLString},
            pages: {type: GraphQLInt},
            authorId: {type: GraphQLID}
           },
           resolve(parent,args){
            let book= new bookModel({
                name: args.name,
                genre: args.genre,
                pages: args.pages,
                authorId: args.authorId
            });
            console.log(book)
            return book.save();
           }
        }
    }

})
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default schema;