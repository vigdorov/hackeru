import * as React from 'react';

export class CardFilm extends React.Component<Props, State> {
  render () {
    const {
      text,
      title,
      imgSrc,
      watch,
      onChangeWatchStatus,
      id
    } = this.props.cardData;
    const summary = {__html: text },
      cardClass = watch ? 'card border-primary' : 'card';

    return (
      <div className={ cardClass }>
        <img src={ imgSrc} alt="" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{ title }</h5>
          <div
            className="card-text"
            dangerouslySetInnerHTML={ summary }
          />
          <button
            className="btn btn-info"
            onClick={() => onChangeWatchStatus(Number(id))}
          >
            {watch ? 'Смотрел' : 'Не смотрел'}
          </button>
        </div>
      </div>
    );
  }
}

export interface Props {
  cardData: {
    title: string,
    text: string,
    imgSrc: string,
    watch: boolean,
    onChangeWatchStatus: any,
    id: string
  }
}

interface State {

}