import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewsComponent.css";

const NewsComponent = () => {
  const [healthNews, setHealthNews] = useState([]);
  const [medicineNews, setMedicineNews] = useState([]);
  const [whoNews, setWhoNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "afa66103711244f6bbf3b57f4a91d826"; // Replace with your API key

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const healthResponse = await axios.get(
          `https://newsapi.org/v2/everything?q=healthcare&language=en&sortBy=publishedAt&pageSize=16&apiKey=${API_KEY}`
        );
        const medicineResponse = await axios.get(
          `https://newsapi.org/v2/everything?q=medicine&language=en&sortBy=publishedAt&pageSize=16&apiKey=${API_KEY}`
        );
        const whoResponse = await axios.get(
          `https://newsapi.org/v2/everything?q=World Health Organization OR WHO&language=en&sortBy=publishedAt&pageSize=16&apiKey=${API_KEY}`
        );
        
        setHealthNews(healthResponse.data.articles);
        setMedicineNews(medicineResponse.data.articles);
        setWhoNews(whoResponse.data.articles);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const renderNews = (newsArray) => (
    <div className="news-container">
      {newsArray.slice(0, 16).map((article, index) => (
        <div key={index} className="news-card">
          <button className="news-button" onClick={() => window.open(article.url, "_blank")}> 
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="news-image" />} 
            <div className="news-content">
              <h3 className="news-title">{article.title}</h3>
              <p className="news-date">Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
          </button>
        </div>
      ))}
    </div>
  );


  return (
    <div>
      <h2>Latest Healthcare News</h2>
      {renderNews(healthNews)}
      
      <h2>Latest Medicine News</h2>
      {renderNews(medicineNews)}
      
      <h2>World Health Organization (WHO) News</h2>
      {renderNews(whoNews)}
    </div>
  );
};

export default NewsComponent;