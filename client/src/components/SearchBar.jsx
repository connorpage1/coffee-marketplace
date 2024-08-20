const SearchBar = ({ handleSearch, searchQuery }) => {
    return (
    <div className="searchbar">
        <label htmlFor="search">Search Products:</label>
        <input
        type="text"
        id="search"
        className="search-bar"
        placeholder="Type a name to search..."
        onChange={handleSearch}
        value={searchQuery}
        />
    </div>
    );
};

export default SearchBar;