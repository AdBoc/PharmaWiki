import React from 'react'

const GeneratedData = (props) => {
    const { data } = props
    const drugsList = data.length ? (
        data.map((drug, index) => {
            return (
                <div key={index}>
                    <p>Name: {drug.name}</p>
                    <p>Details: {drug.details}</p>
                </div>
            )
        })
    ) : (
            <div> No data to show</div>
        );

    return (
        <div>
            Generated Data
            {drugsList}
        </div>
    )
}

export default GeneratedData;