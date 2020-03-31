import React from 'react';
import logo from './logo.svg';
import { loremIpsum } from 'lorem-ipsum';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import './App.css';

const rowCount = 1000;
const listHeight = 600;
const rowHeight = 50;
const rowWidth = 800;

class App extends React.Component {
  constructor() {
    super();
    this.list = Array(rowCount).fill().map((val, idx) => {
      return {
        text: loremIpsum({
          count: 2,
          units: 'sentences',
          sentenceLowerBound: 10,
          sentenceUpperBound: 100
        })
      }
    });
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    });
  }
  
  renderRow = ({ index, key, style, parent }) => {
    return (
      <CellMeasurer 
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}>
          <div style={style} className="row">
            <div className="image">
              <img src={this.list[index].image} alt="" />
            </div>
            <div className="content">
              <div>{this.list[index].name}</div>
              <div>{this.list[index].text}</div>
            </div>
          </div>
      </CellMeasurer>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="list">
          <AutoSizer>
            {
              ({ width, height }) => {
                return <List
                  width={width}
                  height={height}
                  deferredMeasurementCache={this.cache}
                  rowHeight={this.cache.rowHeight}
                  rowRenderer={this.renderRow}
                  rowCount={this.list.length}
                  overscanRowCount={3}
                />
              }
            }
            </AutoSizer>
          </div>
        {/* <div className="list">
          <List
            width={rowWidth}
            height={listHeight}
            rowHeight={rowHeight}
            rowRenderer={this.renderRow}
            rowCount={this.list.length}
          />
        </div> */}
      </div>
    );
  }
}

export default App;
