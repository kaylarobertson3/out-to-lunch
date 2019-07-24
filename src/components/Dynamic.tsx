import React from 'react'

type DF = React.FC<{ path?: String }>
const Dynamic: DF = () => (
  <div>
    <p>
      This is a dynamic page! It will not be statically exported, but is available
      at runtime
      </p>
  </div>
)
export default Dynamic
