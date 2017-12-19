import React, { Component } from 'react';
import './App.css';
// import { scaleLinear } from 'd3-scale';
// import { max } from 'd3-array';
// import { select } from 'd3-selection';
//

// d3.csv("cities.csv", d => console.log(d));

// BELOW PRINTS "Object {tweets: Array[10]}" in the console
// d3.csv("cities.csv", data => console.log(data));
// d3.json("tweets.json", data => console.log(data));

// LISTING 4.7 (pg 126)
// Callback function to draw a scatterplot from tweetData
d3.csv("../data/tweetdata.csv", lineChart);
function lineChart(data) {

  const blue = "#5eaec5", green = "#92c463", orange = "#fe9a22"
        xScale = d3.scaleLinear().domain([1,10.5]).range([20,480])
        yScale = d3.scaleLinear().domain([0,35]).range([480,20])
        xAxis = d3.axisBottom()
          .scale(xScale)
          .tickSize(480)
          .tickValues([1,2,3,4,5,6,7,8,9,10])
        d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis)
        yAxis = d3.axisRight()
          .scale(yScale)
          .ticks(10)
          .tickSize(480)
        d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis)
        d3.select("svg").selectAll("circle.tweets")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "tweets")
          .attr("r", 5)
          .attr("cx", d => xScale(d.day))
          .attr("cy", d => yScale(d.tweets))
          .style("fill", blue)
        d3.select("svg").selectAll("circle.retweets")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "retweets")
          .attr("r", 5)
          .attr("cx", d => xScale(d.day))
          .attr("cy", d => yScale(d.retweets))
          .style("fill", green)
        d3.select("svg").selectAll("circle.favorites")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "favorites")
          .attr("r", 5)
          .attr("cx", d => xScale(d.day))
          .attr("cy", d => yScale(d.favorites))
          .style("fill", orange)
}

// The graphical results of this code (figure 4.15) aren't easily interpreted!
// 4.4.1 (pg 146)
// Drawing a line from points
// By drawing a line that intersects each point of the same category,
// we can compare the number of tweets, retweets, and favorites.
// We can start by drawing a line for tweets using d3.line().
// This line generator expects an array of points as data, and we’ll need to tell
// the generator what values constitute the x and y coordinates for each point....

// LISTING 4.8 (pg 129): New Line Generator code inside the callback function:
var tweetLine = d3.line()
.x(d => xScale(d.day))
.y(d => yScale(d.tweets))
 d3.select("svg")
.append("path")
.attr("d", tweetLine(data))
.attr("fill", "none")
.attr("stroke", "#fe9a22")
.attr("stroke-width", 2)

//We draw the line above the circles we already drew, and the line generator produces the plot shown in figure 4.16.

/// OTHER CODE STARTS HERE
class LineChart extends Component {
  constructor(props) {
    super(props)
    this.createLineChart = this.createLineChart.bind(this)
  }

  componentDidMount() {
    this.createLineChart()
  }

  componentDidUpdate() {
    this.createLineChart()
  }

  createLineChart() {
    const node = this.node
    const dataMax = max(this.props.data)
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]])

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)

  }

  render() {
    return(
      <svg ref={node => this.node = node}
        width={500} height={500}></svg>
    )
  }
}

export default LineChart;
