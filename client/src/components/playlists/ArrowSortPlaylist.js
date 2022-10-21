// css is global path: /client/src/pages/Home.css
import React from "react";
import triangleDownSvg from "../../images/triangle-down.svg";
import triangleUpSvg from "../../images/triangle-up.svg";
import doubleTriangle from "../../images/triangles-up-down.svg";

function ArrowSortPlaylist({ nameColumn, type, prevType, setType }) {
  return (
    <div
      className="arrows"
      onClick={() => {
        setType({ name: nameColumn, order: type.order * -1 });
        prevType.current = type.name;
      }}
    >
      <img
        src={
          type.name === nameColumn
            ? type.order === 1
              ? triangleDownSvg
              : triangleUpSvg
            : doubleTriangle
        }
        alt="triangle-svg"
      />
    </div>
  );
}

export default ArrowSortPlaylist;
