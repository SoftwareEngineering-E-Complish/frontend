import AppRouter from "./components/routing/routers/AppRouter";
import { SearchProvider } from './SearchContext';


const App = () => {
  return (
    <SearchProvider>
       <AppRouter />
    </SearchProvider>
  );
}

export default App;
