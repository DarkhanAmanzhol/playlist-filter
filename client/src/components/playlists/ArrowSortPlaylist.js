// css is global path: /client/src/pages/Home.css
import React from "react";
import triangleDownSvg from "../../images/triangle-down.svg";
import triangleUpSvg from "../../images/triangle-up.svg";
import doubleTriangle from "../../images/triangles-up-down.svg";

function ArrowSortPlaylist({ nameColumn, type, onChangeType }) {
  return (
    <div className='arrows' onClick={() => onChangeType(nameColumn)}>
      <img
        src={
          type.column === nameColumn
            ? type.order === "ASC"
              ? triangleDownSvg
              : triangleUpSvg
            : doubleTriangle
        }
        alt='triangle-svg'
      />
    </div>
  );
}

export default ArrowSortPlaylist;
