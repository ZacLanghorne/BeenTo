import React, {useState, useEffect} from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion'
import {csv} from 'd3-fetch';

const SelectCanvas = (props) => {
    return (
      <>
        <Offcanvas show={props.show} onHide={props.handleClose} name="Test">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Countries Visited ({Math.round((props.selectedCountries.length*1000)/175)/10}%)</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <CountrySelector addCountry={props.addCountry} selectedCountries={props.selectedCountries}/>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

const CountrySelector = (props) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [groupedCountries, setGroupedCountries] = useState({});
  

  useEffect(() => {
    csv(`/countries.csv`).then((data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    let filteredCountries = data.filter(country => String(country.NAME).toLowerCase().startsWith(filter.toLowerCase()));
    setGroupedCountries(groupBy(filteredCountries, "CONTINENT"))
  }, [data, filter])

  const groupBy = (arr, property) => {
    return arr.reduce(function(memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

  const percentCompleted = (continent) => {
    let visited = groupedCountries[continent].filter(el => props.selectedCountries.includes(el.ISO3)).length;
    let totalCountries = groupedCountries[continent].length;
    return (Math.round(visited*1000/totalCountries)/10).toLocaleString()
  }

  return (
      <Form>
        <Form.Group className="mb-3">
          <Form.Control placeholder="Search countries" onChange={(e) => setFilter(e.target.value)}/>
        </Form.Group>
        <Accordion defaultActiveKey={0}> 
          {Object.keys(groupedCountries).map((continent, i) => (
            <Accordion.Item eventKey={i}>
              <Accordion.Header>
                {continent} ({percentCompleted(continent)}%)
              </Accordion.Header>
              <Accordion.Body>
                <CountryList 
                  filteredCountries={groupedCountries[continent]} 
                  selectedCountries={props.selectedCountries} 
                  addCountry={props.addCountry}/>
              </Accordion.Body>
            </Accordion.Item>
          ))
          }
        </Accordion>
      </Form>
  );
}

const CountryList = (props) => {
  return (
    props.filteredCountries.map((country) => (
      <Form.Check 
          key={country.ISO3}
          type='checkbox'
          id={country.ISO3}
          label={country.NAME}
          onClick={props.addCountry}
          defaultChecked={props.selectedCountries.includes(country.ISO3) ? true : false}
      />
  ))
  )
}

export default SelectCanvas;