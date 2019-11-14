const { ApolloServer, gql } = require('apollo-server');

// Our data
let users = [
  {
    id: '1',
    name: 'Peter',
    lastName: 'Pan'
  },
  {
    id: '2',
    name: 'Bill',
    lastName: 'Jukes'
  },
  {
    id: '3',
    name: 'Alf',
    lastName: 'Mason'
  },
  {
    id: '4',
    name: 'Canary',
    lastName: 'Robb'
  }
];

// Type definitions
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    lastName: String
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    postUser(id: ID!, name: String!): User
    deleteUser(id: ID!): User
  }
`;

// Resolvers
const resolvers = {
  Query: {
    getUsers: () => users,
    getUser: (_, id) =>
      getUserHelper(users, id)[0] || new Error('User not found!')
  },
  Mutation: {
    postUser: (_, args) => {
      if (getUserHelper(users, args).length) {
        throw new Error('We have that id!');
      }
      const user = {
        id: args.id,
        name: args.name,
        lastName: args.lastName
      };
      users.push(user);
      return user;
    },
    deleteUser: (_, args) => {
      const user = checkIfIdExists(users, args)
      if (!user) throw new Error('We dont have that user!');
      users = [...deleteUserHelper(users, args)]
      return user
    }
  }
};

function getUserHelper(arr, id) {
  return arr.filter(user => user.id === id.id);
}

function deleteUserHelper(arr, id) {
  return arr.filter(user => user.id !== id.id);
}

function checkIfIdExists(arr, id) {
  return getUserHelper(arr, id)[0]
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.listen(9009).then(serverInformation => {
  console.info(`Server running at ${serverInformation.url}`);
});
