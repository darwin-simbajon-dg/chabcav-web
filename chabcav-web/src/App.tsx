
import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import Content from './components/Content'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='secDiv'>
        <Header />
        <Login/>
        <Content />
      </div>
  )
}

export default App
