import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import colors from './color.json'
import './App.css';
import _, { set } from "lodash";

function App() {

  const [data, setData] = useState([])
  const [sort, setSort] = useState([])
  const [dark, setDark] = useState([])
  const [darkStatus, setDarkStatus] = useState(false)
  const [light, setLight] = useState([])
  const [lightStatus, setLightStatus] = useState(false)
  const [search, setSearch] = useState(null)

  useEffect(()=> {
    let rawData = colors.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)) 

    setData(rawData)
    setSort(rawData)
  }, [])

  useEffect(()=> {
    let rawDark = colors.filter(item => {
      if (item.category === 'dark') {
        return item
      }
    })

    setDark(rawDark)
  }, [dark])

  useEffect(()=> {
    let rawLight = colors.filter(item => {
      if (item.category === 'light') {
        return item
      }
    })
    setLight(rawLight)
  }, [light])


  const onSetPlace =  _.debounce((value) => {
    console.log(value)
  
    if(value === ''){
      setData(sort)
    } else {
      let result = colors.filter(item => {
        if(item.name === value) return item
      })
      console.log(value)
      console.log(result)
      setData(result)
    }
  }, 500);

  const handleDark = () => {
    setDarkStatus(true)
    setData(dark)
  }

  
  const handleLight = () => {
    setLightStatus(true)
    setData(light)
  }

  const handleAll = () => {
    setDarkStatus(false)
    setLightStatus(false)
    setData(sort)
  }

  return (
    <div className="App">
      <h1 style={{color: '#FF00FF', marginTop: 30}}>Welcome to colors gallery app</h1>
      <form action="" class="search-bar">
        <input type="search" name="search" pattern=".*\S.*" required onChange={e =>{ 
          onSetPlace(e.target.value) 
          setSearch(e.target.value)}} />
        <button className="search-btn" type="submit" onClick={() => onSetPlace(search)}>
          <span>Search</span>
        </button>
      </form>
      <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group" style={{marginTop: 0}}>
        <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" onClick={()=> handleDark()}/>
        <label class="btn btn-outline-info" for="btncheck1">Dark</label>

        <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" onClick={()=> handleLight()}/>
        <label class="btn btn-outline-info" for="btncheck2">Light</label>

        <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" onClick={()=> handleAll()}/>
        <label class="btn btn-outline-info" for="btncheck3">All</label>
      </div>
      <div className="container" style={{height: '50vh',overflowY: 'scroll'}}>
        <div className="row">
          {
            data && data.map((item, idx) => {
              return (
              <div className="card col-md-3 col-sm-4" key={idx}>
                <div style={{width: '100%', height: '100%', backgroundColor: `${item.code}`, marginTop: 20, padding: 70, borderWidth: 2, borderColor: 'gray'}}>
                </div>
                <div className="card-body">
                  <p className="card-text">{item.name}</p>
                </div>
              </div>
              )
            })
          }

        </div>
      </div>
    </div>
  );
}

export default App;
 