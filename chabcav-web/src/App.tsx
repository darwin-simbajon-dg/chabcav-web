
import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import Content from './components/Content'
import { useEffect, useState } from 'react';
import PageData from './models/PageData';

function App() {
  const [data, setData] = useState<PageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async() => {

      try {        
        const apiBaseUrl = 'https://chabcav-api-development.up.railway.app'; //process.env.VITE_APP_API_BASE_URL;

        console.log(process.env);
        console.log(process.env.meta);
        console.log(`${apiBaseUrl}/cms/configurations`);

        const response = await fetch(`${apiBaseUrl}/cms/configurations`);
        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.json()}`);
        }
        else{
          const result: PageData = await response.json();
          setData(result);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message: 'Unknown error');
      }
    }

    fetchData();

  }, []);

  if(error) {
    return <div>Error: [error]</div>
  }

  if(!data){
    return <div>Loading...</div>
  }

  return (
    <div>
        <Header bannerImage={data.bannerImage} />
        <Login/>
        <Content content={data.content} />
      </div>
  )
}

export default App
