import React, {Component} from 'react';

interface Props {
  type: string;
  label: string;
  value: string;
  id: string;
  onChange: (event: any) => string;
  placeholder?: string;
  required?: boolean;
}

interface State {
  errorMsg: string;
}

export default class InputGroup extends Component<Props, State> {
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
    let {type, value, id, placeholder, required, label} = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <input
          type={type}
          value={value}
          className="form-control"
          id={id}
          placeholder={placeholder}
          onChange={this.handleChange}
        />
        <small className="form-text text-danger">
          {this.state.errorMsg}
        </small>
      </div>
    );
  }
}
