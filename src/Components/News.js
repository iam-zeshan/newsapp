import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        props.setProgress(30);
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parseData = await data.json();
        props.setProgress(80);
        setLoading(false);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} | NewsApp`;
        updateNews();
    }, [])


    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parseData = await data.json();
        setLoading(false);
        setPage(page+1);
        setTotalResults(parseData.totalResults);
        setArticles(articles.concat(parseData.articles));
    }
    return (
        <>
            <div className="container my-3" >
                <h2 className='text-center' style={{ margin: "34px 0px", marginTop: '90px' }}>NewsApp - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h2>
                {loading && <Loading />}
                <InfiniteScroll style={{ overflow: 'hidden' }}
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Loading />}>

                    <div className="container" >
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={!element.urlToImage ? "https://static.toiimg.com/thumb/msid-88630980,width-1070,height-580,overlay-toi_sw,pt-32,y_pad-40,resizemode-75,imgsize-43080/88630980.jpg" : element.urlToImage} url={element.url} author={!element.author ? "Unknown" : element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )

}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
