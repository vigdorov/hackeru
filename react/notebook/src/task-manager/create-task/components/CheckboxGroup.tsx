import React, {Component} from 'react';

import { StarRate } from '@material-ui/icons';

interface Props {
  label: string;
  value: boolean;
  id: string;
  onChange: (event: any) => string;
}

export default class CheckboxGroup extends Component<Props, {}> {

  handleChange = (event: any) => {
    this.props.onChange(event);
  };

  render () {
    let { value, id, label} = this.props;
    return (
      <div className="custom-control custom-checkbox form-group">
        <input type="checkbox"
               id={id}
               onChange={this.handleChange}
               className="custom-control-input"
               checked={value}
        />
        <label htmlFor={id} className="custom-control-label">
          <StarRate style={{ color: '#ffc107'}}/>
          {label}
        </label>
      </div>
    );
  }
}
