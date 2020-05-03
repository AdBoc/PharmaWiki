//ZROBIC Z TEGO KOMPONENT FUNCKJONALNY
import React, { Component } from 'react';

export default class GeneratedData extends Component {
    render() {
        const { data } = this.props
        const activeList = data.length ? (
            data.map((substance, index) => {
                return (
                    <div key={index}>
                        <p>Name: {substance.substance}</p>
                    </div>
                )
            })
        ) : (
                <div> No data to show</div>
            );

        return (
            <div>
                Generated Data
                {activeList}
            </div>
        )
    }
}
