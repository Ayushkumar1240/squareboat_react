import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './component/Header';
import {Bars} from 'react-loader-spinner';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=e90ceb27d2d94c9280b6c03748baf167").then((res) => {
      setNews(res.data.articles)
      setLoading(false);
      toast.success("News Loaded Successfully")
    })
  }, [])


  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="container">
        <div className="row" text-center>
          {
            loading?<Bars className="arange"/>:
            news.map((val) => {
              return (
                <div className="col my-3">
                  <div className="card" style={{ width: "18rem" }}>
                    <img src={val.urlToImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{val.title}</h5>
                      <p className="card-text">{val.description}</p>
                      <a href={val.url} className="btn btn-primary">Show More</a>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App;
