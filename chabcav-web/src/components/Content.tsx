import React from "react";
import ContentProperties from "../models/ContentProperties";

const Content: React.FC<ContentProperties> = ({content}) => {
    return (
      <div className="content" dangerouslySetInnerHTML={{ __html: content}}>
            
      </div>
    );

};

export default Content;