import logo from './logo.svg';
import './App.css';
import CodeConverter from './Components/CodeConverter';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box color={'gray.300'} minH={{base : '150vh', sm : '150vh', md : '140vh', lg : '116vh', xl : '116vh', '2xl' : '116vh'}} className="App">
      <CodeConverter/>
    </Box>
  );
}

export default App;
