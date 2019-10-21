import React, { Component } from 'react';
import { select } from 'd3-selection';
import { hexbin } from 'd3-hexbin';
import * as d3 from 'd3';
import ShotChartInputForm from './shot_charts_input_form';

class ShotChart extends Component {

  constructor(props) {
    super();
    this.state = {
      data: []
    };
  }

  setNewPlayerData = data => {
    this.setState({ data: data });
  }

  componentDidMount() {
    fetch('https://stats.theseventhman.net/stats/api/v1/players/shots/', { method: 'get', mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      this.setState({ data: data })
    })
    .catch(console.log);
  }
  componentDidUpdate() {
    //this.shotChart();
    const node = this.node;
    var svgContainer = select(node).append("svg").attr('class', 'shot-chart')
                                     .attr("width", 800)
                                     .attr("height", 800);
    d3.selectAll('path.hex').remove();
    var centerCircle = d3.arc()
                          .innerRadius(96)
                          .outerRadius(97)
                          .startAngle(90 * (3.14/180)) //converting from degs to radians
                          .endAngle(270 * (3.14/180)) //just radians
    var innerCenterCircle = d3.arc()
                          .innerRadius(32)
                          .outerRadius(33)
                          .startAngle(90 * (3.14/180)) //converting from degs to radians
                          .endAngle(270 * (3.14/180)) //just radians
    var rightUpperFreethrowCircle = d3.arc()
                          .innerRadius(96)
                          .outerRadius(97)
                          .startAngle(0) //converting from degs to radians
                          .endAngle(90 * (3.14/180)) //just radians
    var leftUpperFreethrowCircle = d3.arc()
                          .innerRadius(96)
                          .outerRadius(97)
                          .startAngle(270 * (3.14/180)) //converting from degs to radians
                          .endAngle(360 * (3.14/180)) //just radians

    var lowerFreethrowCircle = d3.arc()
                          .innerRadius(96)
                          .outerRadius(96)
                          .startAngle(90 * (3.14/180)) //converting from degs to radians
                          .endAngle(270 * (3.14/180)) //just radians

    var rightRestrictedAreaCircle = d3.arc()
                          .innerRadius(64)
                          .outerRadius(65)
                          .startAngle(0) //converting from degs to radians
                          .endAngle(90 * (3.14/180)) //just radians
    var leftRestrictedAreaCircle = d3.arc()
                          .innerRadius(64)
                          .outerRadius(65)
                          .startAngle(270 * (3.14/180)) //converting from degs to radians
                          .endAngle(360 * (3.14/180)) //just radians
    var leftThreePointLine = d3.arc()
                          .innerRadius(380)
                          .outerRadius(381)
                          .startAngle(0)
                          .endAngle(67.5 * (3.14/180))
    var rightThreePointLine = d3.arc()
                          .innerRadius(380)
                          .outerRadius(381)
                          .startAngle(292.5 * (3.14/180)) //converting from degs to radians
                          .endAngle(360 * (3.14/180)) //just radians



    var round = (value, precision)  => {
        const multiplier = 10 ** (precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    if(this.state.data.length > 0){

      var xScale = d3.scaleLinear().domain([-250, 250]).range([0,800]);
      var yScale = d3.scaleLinear().domain([-50, 450]).range([800, 0]);
      var hex = hexbin().x(d => xScale(d.x)).y(d => yScale(d.y)).radius(10);
      var data = hex(this.state.data);
      var filteredData = data.filter( x => {return x.length >= 2});
      var radius = d3.scaleSqrt([0, d3.max(data, d => d.length)], [0, hex.radius(10) * Math.SQRT2])
      var color = d3.scaleLinear().domain([-0.5,0.5]).range(['blue', 'red']);
      var test = svgContainer.selectAll("path").data(filteredData);

      test.exit().remove();
      test.enter()
        .append("path")
        .attr("class", "hex")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .attr("d", d => hex.hexagon(radius(d.length) * 3.5))
        .attr("fill",  d => color(round(d.reduce((a, b) => +a + +b.made, 0)/d.reduce((a, b) => +a + +b.attempted, 0) -
                            d.reduce((a, b) => +a + +b.lg_made, 0)/d.reduce((a, b) => +a + +b.lg_attempted, 0), 2)))
      .append("svg:title")
         .text(d => "".concat("FG% above average: ", round(d.reduce((a, b) => +a + +b.made, 0)/d.reduce((a, b) => +a + +b.attempted, 0) -
                                                     d.reduce((a, b) => +a + +b.lg_made, 0)/d.reduce((a, b) => +a + +b.lg_attempted, 0), 2))
                      + "\nAttempts: ".concat(d.reduce((a, b) => +a + +b.attempted, 0))
                      + "\nLg. Avg. FG%: ".concat(round(d.reduce((a, b) => +a + +b.lg_made, 0)/d.reduce((a, b) => +a + +b.lg_attempted, 0), 2))
                      + "\nPlayer/Team FG%: ".concat(round(d.reduce((a, b) => +a + +b.made, 0)/d.reduce((a, b) => +a + +b.attempted, 0), 2)));
      /*TODO add titles to charts later
      svgContainer.append("text")
        .attr("x", (800 / 2))
        .attr("y", 200)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("")
        */

    }

    var XScale = d3.scaleLinear().domain([0, 50]).range([0,800]);
    var YScale = d3.scaleLinear().domain([0, 47]).range([800, 0]);
    /*court dimensions*/
    svgContainer.append("line")
                          .attr("x1", XScale(0))
                          .attr("y1", YScale(0))
                          .attr("x2", XScale(50))
                          .attr("y2", YScale(0))
                          .attr("stroke-width", 4)
                          .attr("stroke", "black");

    svgContainer.append("line")
                          .attr("x1", XScale(0))
                          .attr("y1", YScale(0))
                          .attr("x2", XScale(0))
                          .attr("y2", YScale(47))
                          .attr("stroke-width", 4)
                          .attr("stroke", "black");

    svgContainer.append("line")
                          .attr("x1", XScale(50))
                          .attr("y1", YScale(0))
                          .attr("x2", XScale(50))
                          .attr("y2", YScale(47))
                          .attr("stroke-width", 4)
                          .attr("stroke", "black");

    svgContainer.append("line")
                          .attr("x1", XScale(0))
                          .attr("y1", YScale(47))
                          .attr("x2", XScale(50))
                          .attr("y2", YScale(47))
                          .attr("stroke-width", 4)
                          .attr("stroke", "black");
    /*center court circles*/
    var circlex = XScale(25);
    var circley = YScale(47);
    svgContainer.append("path")
                 .attr("d", centerCircle)
                 .style("stroke", "black")
                 .attr("stroke-width", 2)
                 .attr("transform", "translate(" + circlex + ", " + circley + ")");

    svgContainer.append("path")
                 .attr("d", innerCenterCircle)
                 .style("stroke", "black")
                 .attr("stroke-width", 2)
                 .attr("transform", "translate(" + circlex + ", " + circley + ")");

    /*backboard*/
    svgContainer.append("line")
                  .attr("x1", XScale(22))
                  .attr("y1", YScale(4))
                  .attr("x2", XScale(28))
                  .attr("y2", YScale(4))
                 .attr("stroke-width", 2)
                  .attr("stroke", "black");
    /*hoop*/
    svgContainer.append("circle")
                .attr("cx", XScale(25))
                .attr("cy", YScale(4.75))
                .attr("r", 12)
                .attr("stroke", "black")
                 .attr("stroke-width", 2)
                .attr("fill", "none");

    /*free throw box*/
    svgContainer.append("line")
                  .attr("x1", 272)
                  .attr("y1", 496)
                  .attr("x2", 272)
                  .attr("y2", 800)
                 .attr("stroke-width", 2)
                  .attr("stroke", "black");

    svgContainer.append("line")
                  .attr("x1", 528)
                  .attr("y1", 496)
                  .attr("x2", 528)
                  .attr("y2", 800)
                 .attr("stroke-width", 2)
                  .attr("stroke", "black");

    svgContainer.append("line")
                  .attr("x1", 272)
                  .attr("y1", 496)
                  .attr("x2", 528)
                  .attr("y2", 496)
                 .attr("stroke-width", 2)
                  .attr("stroke", "black");

    svgContainer.append("line")
                  .attr("x1", 304)
                  .attr("y1", 496)
                  .attr("x2", 304)
                  .attr("y2", 800)
                 .attr("stroke-width", 2)
                  .attr("stroke", "black");
    svgContainer.append("line")
                  .attr("x1", 496)
                  .attr("y1", 496)
                  .attr("x2", 496)
                  .attr("y2", 800)
                 .attr("stroke-width", 2)
                  .attr("stroke", "black");

    /*hash marks for foul shots*/
    svgContainer.append("rect")
                  .attr("x", 258)
                  .attr("y", 688)
                  .attr("width", 14)
                  .attr("height", 4);

    svgContainer.append("rect")
                  .attr("x", 258)
                  .attr("y", 668)
                  .attr("width", 14)
                  .attr("height", 4);

    svgContainer.append("rect")
                  .attr("x", 258)
                  .attr("y", 616)
                  .attr("width", 14)
                  .attr("height", 4);

    svgContainer.append("rect")
                  .attr("x", 258)
                  .attr("y", 554)
                  .attr("width", 14)
                  .attr("height", 4);

    svgContainer.append("rect")
                  .attr("x", 528)
                  .attr("y", 688)
                  .attr("width", 14)
                  .attr("height", 4);

    svgContainer.append("rect")
                  .attr("x", 528)
                  .attr("y", 668)
                  .attr("width", 14)
                  .attr("height", 4);

    svgContainer.append("rect")
                  .attr("x", 528)
                  .attr("y", 616)
                  .attr("width", 14)
                  .attr("height", 4);

    svgContainer.append("rect")
                  .attr("x", 528)
                  .attr("y", 554)
                  .attr("width", 14)
                  .attr("height", 4);
    /*free throw circles */
    svgContainer.append("path")
                 .attr("d", rightUpperFreethrowCircle)
                 .attr("stroke-width", 2)
                 .style("stroke", "black")
                 .attr("transform", "translate(400,496)");

    svgContainer.append("path")
                 .attr("d", leftUpperFreethrowCircle)
                 .style("stroke", "black")
                 .attr("stroke-width", 2)
                 .attr("transform", "translate(400,496)");
    svgContainer.append("path")
                 .attr("d", lowerFreethrowCircle)
                 .style("stroke", "black")
                 .attr("stroke-width", 2)
                 .style("stroke-dasharray", "18.56 18.56")
                 .attr("transform", "translate(400,496)")
                 ;
    /*restricted area*/
    svgContainer.append("path")
                 .attr("d", rightRestrictedAreaCircle)
                 .style("stroke", "black")
                 .attr("stroke-width", 2)
                 .attr("transform", "translate(400,724)");

    svgContainer.append("path")
                 .attr("d", leftRestrictedAreaCircle)
                 .style("stroke", "black")
                 .attr("stroke-width", 2)
                 .attr("transform", "translate(400,724)");


    svgContainer.append("line")
                  .attr("x1", 335.5)
                  .attr("y1", 724)
                  .attr("x2", 335.5)
                  .attr("y2", 736)
                 .attr("stroke-width", 3)
                  .attr("stroke", "black");

    svgContainer.append("line")
                  .attr("x1", 464.5)
                  .attr("y1", 724)
                  .attr("x2", 464.5)
                  .attr("y2", 736)
                 .attr("stroke-width", 3)
                  .attr("stroke", "black");

    /* three point line */
    svgContainer.append("line")
                  .attr("x1", XScale(3))
                  .attr("y1", YScale(0))
                  .attr("x2", XScale(3))
                  .attr("y2", YScale(14))
                 .attr("stroke-width", 3)
                  .attr("stroke", "black");
    svgContainer.append("line")
                  .attr("x1", XScale(47))
                  .attr("y1", YScale(0))
                  .attr("x2", XScale(47))
                  .attr("y2", YScale(14))
                 .attr("stroke-width", 3)
                  .attr("stroke", "black");

    svgContainer.append("path")
                 .attr("d", rightThreePointLine)
                 .attr("transform", "translate(" + XScale(25) + ", " + YScale(5.33) + ")")
                 .attr("stroke-width", 2)
                 .attr("stroke", "black");

    svgContainer.append("path")
                 .attr("d", leftThreePointLine)
                 .attr("transform", "translate(" + XScale(25) + ", " + YScale(5.33) + ")")
                 .attr("stroke-width", 2)
                 .attr("stroke", "black");

    /*half court hash marks*/
    svgContainer.append("rect")
                  .attr("x", 0)
                  .attr("y", 352)
                  .attr("width", 48)
                  .attr("height", 2.66);

    svgContainer.append("rect")
                  .attr("x", 752)
                  .attr("y", 352)
                  .attr("width", 48)
                  .attr("height", 2.66);
  }

  render() {


    const pStyle = {padding: "10px", width: "100%", "text-align": "center"}
    const divStyle = {"align-items": "center", padding: "20px", width: "75%" }

    return (
          <div>
            <div className="input-form">
              <ShotChartInputForm
                teamOptions={this.props.teamSelect}
                playerOptions={this.props.playerSelect}
                seasonOptions={this.props.seasonSelect} onClick={this.setNewPlayerData}/>
            </div>
            <div className="shot-chart" style={pStyle}>
              <svg ref={node => this.node = node} style={divStyle}
              width={800} height={800}>
              </svg>
            </div>
          </div>
    )
  }
}

export default ShotChart


