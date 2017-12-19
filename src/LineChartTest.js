// ADDITIONAL SCRIPTS
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.8/d3.min.js" type="text/JavaScript"></script>
  <script src="../js/legend.js" type="text/JavaScript"></script>

// STYLE
.tick > line {
      stroke: #EBD8C1;
    }
    text {
      fill: #EBD8C1;
    }
    text.label {
      fill: #9A8B7A;
    }
    path.domain {
      stroke: none;
      fill: none;
    }

// HTML
<div id="viz">
      <svg style="width:600px;height:600px;" ></svg>
    </div>
// SCRIPT
d3.csv("../data/movies.csv", lineChart);

      function lineChart(data) {

        var fillScale = d3.scaleOrdinal()
          .domain(["titanic", "avatar", "akira", "frozen", "deliverance", "avengers"])
          .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F", "#5eafc6", "#41a368"]);

        var xScale = d3.scaleLinear().domain([ 1, 10 ]).range([ 20, 470 ]);
        var yScale = d3.scaleLinear().domain([ 0, 55 ]).range([ 480, 20 ]);

        var xAxis = d3.axisBottom()
          .scale(xScale)
          .tickSize(480)
          .tickValues([1,2,3,4,5,6,7,8,9,10]);

        d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);

        var yAxis = d3.axisRight()
          .scale(yScale)
          .ticks(10)
          .tickSize(480);

        d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);

        var legendA = d3.legendColor().scale(fillScale);

        d3.select("svg")
          .append("g")
            .attr("transform", "translate(500, 0)")
            .call(legendA);

        var n = 0;
        Object.keys(data[0]).forEach(key => {
          if (key != "day") {
            var movieArea = d3.area()
              .x(d => xScale(d.day))
              .y0(d => yScale(simpleStacking(d,key) - d[key]))
              .y1(d => yScale(simpleStacking(d, key)))
              .curve(d3.curveBasis);
            d3.select("svg")
              .append("path")
                .style("id", `${key} Area`)
                .attr("d", movieArea(data))
                .attr("fill", fillScale(key))
                .attr("stroke", "black")
                .attr("stroke-width", 1);
            n++;
          }
        });

        function simpleStacking( lineData, lineKey) {
          var newHeight = 0;
          Object.keys(lineData).every(key => {
            if (key !== "day") {
              newHeight += parseInt(lineData[key]);
              if (key === lineKey) {
                return false;
              }
            }
            return true;
          })
          return newHeight;
        }
      }
