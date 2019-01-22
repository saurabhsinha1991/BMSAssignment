import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { fetchTrailers, filterItems } from './actions';

import Header from './components/Header';
import Card from './components/Card';

class App extends Component {

  constructor() {

      super();

      this.state = {
          iframeIndex: '',
          isOpen: false,
          wrapCount: 5
      }

      this.filterItems = [];
  }

  componentDidMount() {
    this.props.fetchTrailers();

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    if(window.innerWidth < 500) {
        this.setState({ wrapCount: 2 });
    } else {
        this.setState({ wrapCount: 5 });
    }
  }

  iframeClick = (iframeIndex) => {
      this.setState({
          iframeIndex
      })
  }

  filterLanguage = (e) => {
      if ( e.target.checked ) {
          this.filterItems.push(e.target.id);
      }
      else {
          let index = this.filterItems.indexOf(e.target.id);
          this.filterItems.splice(index, 1);
      }
      this.setState({
        iframeIndex: ''
      })
      this.props.filterItems(this.filterItems);
  }

  toggleDropdown = () => {
    this.setState((state) => {
      return {isOpen: !state.isOpen};
    })
  }

  wrapContent = () => {
      const { wrapCount } = this.state,
        { movieList } = this.props.items.list;

      const list = Object.keys(movieList);
      let output = [];

      for (let i = 0; i < list.length; i+= wrapCount) {
          let singleItem = list.slice(i, i + wrapCount)
            output.push(singleItem)
      }

      return output;
  }

  removeItem = (item) => {
    let index = this.filterItems.indexOf(item);
    this.filterItems.splice(index, 1);

    this.setState({
        iframeIndex: ''
    });
    this.props.filterItems(this.filterItems);
  }

  render() {
    const { items : {
      list: {
        filter: {
          languageList = []
        },
        movieList = {}
      }
    } } = this.props;

    const list = Object.keys(movieList).length > 0 ? this.wrapContent() : [];

    return (
          <div className='wrapper'>
              <Header list={languageList} isOpen={this.state.isOpen} filterLanguage={this.filterLanguage} toggleDropdown={this.toggleDropdown} />
              { this.filterItems.length > 0 && 
                    <div className='filter'>
                        { this.filterItems.map((eachFilterItem) => <span> {eachFilterItem} <span onClick={() => this.removeItem(eachFilterItem)}>X</span></span>) }
                    </div>
              }
              <div className='container'>
                { list.map( eachGroup => (
                    <React.Fragment>
                        { this.state.iframeIndex.length > 0 && eachGroup.indexOf(this.state.iframeIndex) !== -1 &&
                            <div className='content'>
                                <div className='tile youtube'>
                                    <iframe width="100%" height="400" src={`https://www.youtube.com/embed/${movieList[this.state.iframeIndex].TrailerURL.split('=')[1]}?autoplay=1`}>
                                    </iframe>
                                </div>
                                <div className='tile content-details'>
                                    <h3>{ movieList[this.state.iframeIndex].EventTitle }</h3>
                                    <p>{ movieList[this.state.iframeIndex].EventLanguage }</p>
                                    <p>{ movieList[this.state.iframeIndex].EventTitle }</p>
                                </div>
                            </div>
                        }
                        <div className='row'>
                            { eachGroup.map(item => (
                                <Card details={movieList[item]} iframeClick={this.iframeClick} />
                            )) }
                        </div>
                    </React.Fragment>
                ))}
              </div>
          </div>
    );
  }
}

const mapStateToProps = state => {
    debugger
    return {
        items: state
    }
};

export default connect(mapStateToProps, { fetchTrailers, filterItems })(App);
