type searchProps = {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}
/**
 * @function SearchProductInCatalog
 * @param setSearchTerm
 * @returns the search input for user to search for product
 */
const SearchProductInCatalog: React.FC<searchProps> = ({ setSearchTerm }) => {
    return (
        <div style={{ width: "100%", marginBottom: "20px", marginLeft: "5%", height: "40px" }}>
            <input
                style={{ width: "90%", paddingLeft: "10px", height: "100%", border: "2px solid rgba(0,0,0,0.1)", borderRadius: "25px" }}
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                placeholder="search product by name"
            />
        </div>
    )
}

export default SearchProductInCatalog;