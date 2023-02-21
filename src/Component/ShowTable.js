import DataTable from "react-data-table-component";
import React from 'react'

function showTable({title,columns, data}){
    return(
        <DataTable
            title={title}
            columns={columns}
            data={data}
        />
    )
}

export default showTable