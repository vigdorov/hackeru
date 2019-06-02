import 'bootstrap';
import '../css/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactElement } from 'react';
import { CardFilm } from './components/CardFilm/index';

class App extends React.Component<{}, State> {

  constructor (props: {}) {
    super(props);

    this.state = {
      moviesList: [],
      watchList: {}
    }
  }

  componentDidMount () {
    const movies = fetch('https://api.tvmaze.com/search/shows?q=batman');
    movies
      .then( promise => {
      return promise.json();
    })
      .then( data => {
        let watches: watchesList = {};
        data.forEach( (elem: any) => {
          let id = Number(elem.show.id);
          watches[id] = false;
        });

        this.setState({
          moviesList: data,
          watchList: watches
        });
      })
      .catch( e => {
      console.log('Error:', e);
    })
  }

  handleChangeWatchStatus = (id: number) => {
    console.log(id);
    this.setState( previousState => {
      console.log(previousState.watchList);
      return ({
        watchList: {
          ...previousState.watchList,
          [id]: !previousState.watchList[id]
        }
      });
    });
  };

  render () {
    let listFilms: ReactElement[] = [];

    this.state.moviesList.forEach( element => {
      let data = {
        text: element.show.summary,
        title: element.show.name,
        imgSrc: element.show.image.medium,
        watch: this.state.watchList[element.show.id],
        onChangeWatchStatus: this.handleChangeWatchStatus,
        id: element.show.id
      };
      listFilms.push(
        <CardFilm
          key={ element.show.id }
          cardData={ data }
        />
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>The Batman Movies</h4>
            <div className="card-columns">
              {listFilms.length ? listFilms : 'Loading...'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface State {
  moviesList: any[],
  watchList: watchesList
}

interface watchesList {
  [id: number]: boolean
}

ReactDOM.render(
  <App />,
  document.getElementById('root-react')
);
