function SearchBar({ searchTerm, setSearchTerm }) {
    return (
      <input
        type="text"
        className="form-control"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    );
  }
  
  export default SearchBar;