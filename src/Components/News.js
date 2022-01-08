import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor() {
        super();
        console.log("this is constructor from news class");
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            // country: 'in'
            totalResults: 0
        }
    }
    async componentDidMount() {
        // console.log('this is from compnentDidMount');
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({ loading: false })

        // // console.log(parseData);
        // this.setState({ articles: parseData.articles, page: 1, totalResults: parseData.totalResults });
        this.updateNews();
    }
    async updateNews() {
        console.log('this is from compnentDidMount');
        this.props.setProgress(10);
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(50);
        let parseData = await data.json();
        this.props.setProgress(80);
        this.setState({ loading: false })
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults });
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} | NewsApp`;
        // }
        this.props.setProgress(100);
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ loading: false })
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults
        });
    }
    // document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} | NewsApp`;    }
    // handleNextClick = async () => {
    //     // console.log('Next button is pressed');
    //     // if (!(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))){

    //     // // }else{

    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    //     //     this.setState({loading: true})
    //     //     let data = await fetch(url);
    //     //     let parseData = await data.json();
    //     //     this.setState({loading: false})
    //     //     this.setState({
    //     //         page : this.state.page + 1,
    //     //         articles: parseData.articles
    //     //     });
    //     // }

    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();

    // }

    // handlePrevClick = async () => {
    //     // console.log('this is from compnentDidMount');
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading: true})
    //     // let data = await fetch(url);
    //     // let parseData = await data.json();
    //     // this.setState({loading: false})
    //     // this.setState({ 
    //     //     page : this.state.page - 1,
    //     //     articles: parseData.articles
    //     // });

    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }
    render() {
        console.log('Hi this from render')
        return (
            <>
                <div className="container my-3" >
                    <h2 className='text-center' style={{ margin: "34px 0px" }}>NewsApp - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>
                    {this.state.loading && <Loading />}
                    <InfiniteScroll style={{overflow: 'hidden'}}
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Loading />}
                        >
                    
                        <div className="container" >

                            <div className="row">
                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4 my-3" key={element.url}>
                                        <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={!element.urlToImage ? "https://static.toiimg.com/thumb/msid-88630980,width-1070,height-580,overlay-toi_sw,pt-32,y_pad-40,resizemode-75,imgsize-43080/88630980.jpg" : element.urlToImage} url={element.url} author={!element.author ? "Unknown" : element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
                {/* <div className="container my-4 d-flex justify-content-between">
                        <button disabled={this.state.page === 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo;Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo; </button>
                    </div> */}
            </>
        )
    }
}
