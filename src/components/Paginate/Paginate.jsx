import React, { createContext } from "react";
import { Pagination } from "react-bootstrap";
import "./Paginate.scss";

const Paginate = ({
  product,
  changePageOffset,
  changePageLimit,
  getPageOffset,
  getPageLimit,
}) => {
  const pageLimit = Math.ceil(product.length / getPageOffset);
  const pageCounts = [];
  const getSelectvalue = async (evt) => {
    evt.preventDefault;
    changePageOffset(+evt.target.value);
  };
  for (let i = 0; i < pageLimit; i++) {
    pageCounts.push(i + 1);
  }

  return (
    <div>
      <div
        className="pagination"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
        }}
      >
        <div>
          <select onChange={(evt) => getSelectvalue(evt)}>
            <option defaultValue={5} value="5">
              5
            </option>

            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>

        <Pagination>
          {getPageLimit == 1 ? (
            <Pagination.Prev disabled />
          ) : (
            <Pagination.Prev
              onClick={() => {
                changePageLimit(getPageLimit - 1);
                window.scrollTo(0, 0);
              }}
            />
          )}
          {pageCounts.map((c, index) =>
            getPageLimit == +c ? (
              <Pagination.Item key={index} active className="pagination-item">
                {+c}
              </Pagination.Item>
            ) : (
              <Pagination.Item
                key={index}
                onClick={() => {
                  changePageLimit(+c);
                  window.scrollTo(0, 0);
                }}
                className="pagination-item"
              >
                {+c}
              </Pagination.Item>
            )
          )}
          {getPageLimit == pageLimit ? (
            <Pagination.Next disabled />
          ) : (
            <Pagination.Next
              onClick={() => {
                changePageLimit(getPageLimit + 1);
                window.scrollTo(0, 0);
              }}
            />
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default Paginate;
