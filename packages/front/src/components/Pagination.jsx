import React from 'react'

function Pagination({showPagination, newPage}) {

    const handlePage = (dir) => {
        newPage(dir);
    }

    return (
        <div>
            {showPagination && (
                <div className="page-container">
                    <button className="prev-next" onClick={() => handlePage("previous")}>Previous</button>
                    <button className="prev-next" onClick={() => handlePage("next")}>Next</button>
                </div>
            )}
        </div>
    )
}

export default Pagination;
