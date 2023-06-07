import React from "react";

export default class DateInput extends React.Component<{
  value: string;
  onChange: (value: string) => void;
}> {
  render() {
    return (
      <input
        type="date"
        value={this.props.value}
        onChange={(e) => this.props.onChange(e.target.value)}
      />
    );
  }
}
