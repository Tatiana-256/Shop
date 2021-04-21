import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const Search:React.FC = () => {
  const [keyWord, setKeyWord] = useState("");

  const history = useHistory();

  const searchHandler = (e: any) => {
    e.preventDefault();

    if (keyWord.trim()) {
      history.push(`/search/${keyWord}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e: any) => {
            setKeyWord(e.target.value);
          }}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};
