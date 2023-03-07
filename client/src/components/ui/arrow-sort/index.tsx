// css is global path: /client/src/pages/Home.css
import React from "react";
import "./style.css";
import triangleDownSvg from "images/svg/triangle-down.svg";
import triangleUpSvg from "images/svg/triangle-up.svg";
import doubleTriangle from "images/svg/triangles-up-down.svg";

type Props = {
  nameColumn: string;
  type: {
    column: string;
    order: string;
  };
  onChangeType: (nameColumn: string) => void;
};

export const ArrowSort: React.FC<Props> = ({ nameColumn, type, onChangeType }) => {
  return (
    <div className="arrows" onClick={() => onChangeType(nameColumn)}>
      <img
        className="arrows__img"
        src={
          type.column === nameColumn
            ? type.order === "asc"
              ? triangleDownSvg
              : triangleUpSvg
            : doubleTriangle
        }
        alt="triangle-svg"
      />
    </div>
  );
};
