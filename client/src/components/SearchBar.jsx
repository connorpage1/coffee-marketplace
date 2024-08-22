import { Input } from "semantic-ui-react";

const SearchBar = ({ handleSearch, searchQuery }) => {
  return (
    <div className="searchbar">
      <Input
        icon="search"
        iconPosition="left"
        placeholder="Type a name or tag to search..."
        onChange={handleSearch}
        value={searchQuery}
        fluid
      />
    </div>
  );
};

export default SearchBar;
