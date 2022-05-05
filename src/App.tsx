import React from 'react';
import {JsonViewer} from './Json/JsonViewer';
import styled from 'styled-components';
import testJson from './testJson.json';

// Ok so I need a code display for json that has nodes which are aware of their jsx counterpart

// This will allow me to manipulate the jsx based on an inputed json patch

// Ok so maybe lets walk over the json and store the path + jsx for each node as a start

const PageContainer = styled.div`
  display: grid;
`;

function App() {
  const jsonObject = JSON.parse('{"name":"John", "age":30, "car":null}');
  // const jsonArray = JSON.parse('[{"color": "red", "value": "#f00"}, {"color": "green", "value": "#0f0"}, {"color": "blue", "value": "#00f"}]');
  // const jsonString = JSON.parse('"color"');
  const jsonBasic = JSON.parse('{"id":"0001","type":"donut","name":"Cake","ppu":0.55,"batters":{"batter":[{"id":"1001","type":"Regular"},{"id":"1002","type":"Chocolate"},{"id":"1003","type":"Blueberry"},{"id":"1004","type":"Devil\'s Food"}]},"topping":[{"id":"5001","type":"None"},{"id":"5002","type":"Glazed"},{"id":"5005","type":"Sugar"},{"id":"5007","type":"Powdered Sugar"},{"id":"5006","type":"Chocolate with Sprinkles"},{"id":"5003","type":"Chocolate"},{"id":"5004","type":"Maple"}]}');
  // const jsonComplex = JSON.parse('');

  // const jsonObjectPatch = JSON.parse('[{"op":"replace","path":"/name","value":"Tim"}]');

  const jsonBasicPatch = JSON.parse('[{"op":"replace","path":"/topping/6/id","value":"5008"},{"op":"replace","path":"/topping/1/type","value":"None"},{"op":"replace","path":"/topping/1/id","value":"5001"},{"op":"replace","path":"/topping/0/type","value":"Glazed"},{"op":"replace","path":"/topping/0/id","value":"5002"},{"op":"remove","path":"/batters/batter/3"}]');

  return (
    <PageContainer className="App">
      {/* <JsonViewer json={jsonObject} patch={jsonObjectPatch}/>*/}
      {/* <JsonViewer json={jsonArray}/>*/}
      {/* <JsonViewer json={jsonString}/>*/}
      <JsonViewer json={jsonBasic} patch={jsonBasicPatch}/>
      {/* <JsonViewer json={testJson}/>*/}
    </PageContainer>
  );
}

export default App;
