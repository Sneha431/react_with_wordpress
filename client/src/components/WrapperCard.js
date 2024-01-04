import React from 'react';

function WrapperCard( {children}) {
  return (
    <div>
      <div className="card border-primary mb-3" style={{"maxWidth": "20rem"}}>
  <div className="card-header">Show content</div>
  <div className="card-body">
  {children}
    <p className="card-text"></p>
  </div>
</div>
 </div>
  )
}

export default WrapperCard
