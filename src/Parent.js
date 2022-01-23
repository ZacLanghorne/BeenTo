import React, {useState, useEffect} from "react";
import ReactTooltip from "react-tooltip";
import MapChart from './MapChart';
import MyNavbar from './Navbar';

const Parent = () => {
    const [selectedCountries, setSelectedCountry] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        const gotCountries = JSON.parse(window.localStorage.getItem('selectedCountries'))
        const newValue = gotCountries ? gotCountries : []
        setSelectedCountry(newValue);
    }, []
    );

    useEffect(() => {
        window.localStorage.setItem('selectedCountries', JSON.stringify(selectedCountries));
    }, [selectedCountries]
    );

    function addCountry({target}){
        if (selectedCountries.includes(target.id)){
            setSelectedCountry(selectedCountries.filter((c) => { return c !== target.id }))
        }
        else {
            setSelectedCountry(prevState => (
                [...prevState, target.id]
              ))
        }
    };

    return (
        <div>
            <MyNavbar addCountry={addCountry} selectedCountries={selectedCountries} />
            <MapChart data={selectedCountries} setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </div>
    )
}

export default Parent;
