import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteCriminals from "./Delete";
// import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function ListCriminals() {
  const [allCRiminals, setAllCriminals] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      setFiltered(allCRiminals);
    } else {
      const filteredItems = allCRiminals.filter((item) =>
        item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFiltered(filteredItems);
    }
  };
  

  const user = useSelector((store) => store.auth.user);
  const token = user?.token || "";

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    axios
      .get('http://127.0.0.1:8000/api/listcriminals', {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setAllCriminals(response.data);
        setFiltered(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // You might want to handle this error more gracefully
        // setLoading(false);
      });
  }

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
            <div className="container-fluid">
        <div className="row">
          <div className="col-8 offset-2">
            <form className="form-inline my-3" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control mr-sm-2"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              <button className="btn btn-primary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">CRIMINALS RECORD</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            
            <Link to="/addcriminals" className="btn btn-info mb-2">
              Add Medicine
            </Link>
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Name</th>
                  <th>date of birth</th>
                  <th>gender</th>
                  <th>offence description</th>
                  <th>victim name</th>
                  <th>case status</th>
                  <th>case number</th>
                  <th>arresting officer</th>
                  <th>release date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post) => (
                  <DeleteCriminals key={post.id} post={post} refresh={fetchPosts} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCriminals;

