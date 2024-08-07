
import './App.css';
import { Outlet } from 'react-router-dom';
// import ApolloProvider
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider, 
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Navbar from './components/Navbar';

// Construct main graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the jwt token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get token from local storage if exists
  const token = localStorage.getItem("id_token");
  // return headers to the context
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    
    <ApolloProvider client={client}>
    <Navbar />
    <Outlet />
  </ApolloProvider>
);
}

    
 
export default App;
