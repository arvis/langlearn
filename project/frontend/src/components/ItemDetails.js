import React from 'react';

class ItemDetails extends React.Component {

  render(){
    console.log(this.props);
    const { params } = this.props.match;
    return (
      <div>
        Item details 
        <p>{params.id}</p>
      </div>
    );
  }
}

export default ItemDetails;