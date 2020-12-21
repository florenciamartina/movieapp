import React from 'react'

function Pagination({showPagination, newPage}) {

    const handlePage = (dir) => {
        newPage(dir);
    }

    return (
        <div>
            {showPagination && (
                <>
                    <button onClick={() => handlePage("previous")}>Previous</button>
                    <button onClick={() => handlePage("next")}>Next</button>
                </>
            )}
        </div>
    )
}

export default Pagination;
