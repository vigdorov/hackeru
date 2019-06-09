import React, {Component} from 'react';

interface Props {
  label: string;
  value: string[];
  id: string;
  choice: string;
  onChange: (event: any) => string;
}

export default class SelectGroup extends Component<Props, {}> {
  render () {
    let { value, id, label, choice} = this.props;
    let options = value.map( (opt, i) => {
      return (
        <option key={i}>{opt}</option>
      );
    });

    return (
      <div className="form-group">
        <label htmlFor={id}>
          {label}
        </label>
        <select name={id}
                value={choice}
                id={id}
                className="form-control"
                onChange={this.props.onChange}
        >
          {options}
        </select>
      </div>
    );
  }
}
