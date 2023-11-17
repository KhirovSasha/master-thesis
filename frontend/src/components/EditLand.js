import React from "react";
import { useParams } from "react-router-dom";

function EditLand({par}) {
  const { id } = useParams();

  // Now 'id' contains the value from the URL, e.g., if the URL is '/edit-land/123', id will be '123'

  // Rest of your component logic...

  return (
    <div>
      <h1>Edit Land {id}</h1>
      {/* Rest of your component rendering... */}
    </div>
  );
}

export default EditLand;
