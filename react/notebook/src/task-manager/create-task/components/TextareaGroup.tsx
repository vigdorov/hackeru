import React, {Component} from 'react';

interface Props {
  label: string;
  value: string;
  id: string;
  onChange: (event: any) => string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  required?: boolean;
}

interface State {
  errorMsg: string;
}

export default class TextareaGroup extends Component<Props, State> {
  constructor (props: Props) {
    super(props);

    this.state = {
      errorMsg: '',
    };
  }

  handleChange = (event: any) => {
    let errorMsg = this.props.onChange(event);

    this.setState({
      errorMsg: errorMsg
    });
  };

  render () {
    let { value, id, placeholder, required, label, rows, cols} = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <textarea
          value={value}
          className="form-control"
          id={id}
          placeholder={placeholder}
          onChange={this.handleChange}
          rows={rows}
          cols={cols}
        />
        <small className="form-text text-danger">
          {this.state.errorMsg}
        </small>
      </div>
    );
  }
}
