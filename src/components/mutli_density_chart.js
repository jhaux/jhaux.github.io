import * as d3 from 'd3'


export function MultiDensityChart(csvPath, element, cstmWidth=null, cstmHeight=null) {

    const baseWidth = cstmWidth || 700
    const baseHeight = cstmHeight || 400

    var margin = { top: 30, right: 10, bottom: 30, left: 100 },
        width = baseWidth - margin.left - margin.right,
        height = baseHeight - margin.top - margin.bottom
    
    // Percent two area charts can overlap
    var overlap = 0.5
    
    var svg = d3.select(element).append('svg')
            //.attr('width', baseWidth)
            //.attr('height', baseHeigth)
            .attr('viewBox', `0 0 ${baseWidth} ${baseHeight}`)
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // Add a clipPath: everything out of this area won't be drawn.
    var defs = svg.append("defs")
    defs.append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height+margin.top )
        .attr("x", 0)
        .attr("y", -margin.top);

    var x = function(d) { return d.time },
        xScale = d3.scaleTime().range([0, width]),
        xValue = function(d) { return xScale(x(d)) },
        xAxis = d3.axisBottom(xScale) // .tickFormat(formatTime)
    
    var y = function(d) { return d.value },
        yScale = d3.scaleLinear(),
        yValue = function(d) { return yScale(y(d) / 15) }
    
    var activities = {
      tex: 'Latex',
      js: 'javascript',
      vue: 'Vue',
      html: 'Html',
      css: 'CSS',
      py: 'python',
      cpp: 'C++',
      cs: 'C#'
    }

    var activity = function(d) { return d[0] },
        activityScale = d3.scaleBand().range([0, height]),
        activityValue = function(d) { return activityScale(activity(d)) },
        activityAxis = d3.axisLeft(activityScale)

    var areaHolder = svg.append('g')
          .attr("clip-path", "url(#clip)")

    var area = d3.area()
        .x(xValue)
        .y1(yValue)
        .curve(d3.curveBasis)
    
    // var line = area.lineY1()
    
    function parseTime(offset) {
        var date = new Date(1970, 0, 1)
        return d3.timeDay.floor(d3.timeSecond.offset(date, offset))
    }
    
    function row(d) {
        var content = {
            activity: activities[d.type],
            type: d.type,
            time: parseTime(parseInt(d.time)),
            value: d.total
        }
      return content
    }

    //Filter for the outside glow
    var filter = defs.append('filter').attr('id','glow')
    // feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
    // feMerge = filter.append('feMerge'),
    // feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
    // feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');
    filter.append('feGaussianBlur').attr('stdDeviation','0.5').attr('result','coloredBlur')
    var feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode').attr('in','coloredBlur')
    feMerge.append('feMergeNode').attr('in','SourceGraphic')


    d3.csv(csvPath, row).then(function(dataFlat) {
        dataFlat = dataFlat.filter(function(row) {
          return row.type === 'js' || 
                 row.type === 'vue' || 
                 row.type === 'py' ||
                 row.type === 'cpp' ||
                 row.type === 'cs' ||
                 row.type === 'tex'
        })
    
        // Sort by time
        dataFlat.sort(function(a, b) { return a.time - b.time })

        var data = d3.groups(dataFlat, d => d.activity)
        
        xScale.domain(d3.extent(dataFlat, x))
    
        activityScale.domain(data.map(function(d) { return d[0] }))
    
        var areaChartHeight = (1 + overlap) * (height / activityScale.domain().length)
    
        yScale
            .domain(d3.extent(dataFlat, y))
            .range([areaChartHeight, 0])
        
        area.y0(yScale(0))
    
        const xAxisElement = svg.append('g').attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
    
        svg.append('g').attr('class', 'axis axis--activity')
            .call(activityAxis)

        // Add brushing
        // Add the brush feature using the d3.brush function
        const brush = d3.brushX()
            // initialise the brush area: start at 0,0 and finishes at
            // width,height: it means I select the whole graph area
            .extent( [ [0,0], [width,height] ] )
            // Each time the brush selection changes, trigger the 'updateChart'
            // function
            .on("end", updateChart)

        // Add the brushing
        areaHolder
          .append("g")
            .attr("class", "brush")
            .call(brush);

        var gActivity = areaHolder.append('g').attr('class', 'activities')
                .selectAll('.activity').data(data)
            .enter().append('g')
                .attr('class', function(d) { return 'activity activity--' + d[0]})
                .attr('transform', function(d) {
                    var ty = activityValue(d) - activityScale.bandwidth()
                    return 'translate(0,' + ty + ')'
                })
    
        var actCount = -1
        gActivity.append('path')
            .attr('class', () => {
              actCount++
              var appendix = actCount % 2 ? '' : ' area_odd'
              return 'area' + appendix
            })
            .datum(function(d) { return d[1] })
            .attr('d', area)
            .style("filter" , "url(#glow)");  

        var zoomTransitionRunning = false

        areaHolder
            .selectAll('g.activity > path.area')
            .on('mouseover', function (){
              if ( zoomTransitionRunning ) return;

             //Dim all blobs
             d3.selectAll("g.activity > path.area")
              .transition().duration(200)
              .style("stroke-opacity", 0.2)
              .style("fill-opacity", 0.2); 
             //Bring back the hovered over blob
             d3.select(this)
              .transition().duration(200)
              .style("stroke-opacity", 1)
              .style("fill-opacity", 0.7); 
            })
            .on('mouseout', function(){
              if ( zoomTransitionRunning ) return;

             //Bring back all blobs
             d3.selectAll("g.activity > path.area")
              .transition().duration(200)
              .style("stroke-opacity") // , 'unset')
              .style("fill-opacity") // , 'unset');
            });
    

         // A function that set idleTimeOut to null
        var idleTimeout
        function idled() { idleTimeout = null; }

        // A function that update the chart for given boundaries
        function updateChart(event) {

          zoomTransitionRunning = true

          // What are the selected boundaries?
          const extent = event.selection

          // If no selection, back to initial coordinate. Otherwise, update X
          // axis domain
          if(!extent){
            // This allows to wait a little bit
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350);
            xScale.domain(d3.extent(dataFlat, function(d) { return d.time; }))
          } else {
            xScale.domain([ xScale.invert(extent[0]), xScale.invert(extent[1]) ])
            // This remove the grey brush area as soon as the selection has been done
            areaHolder.select(".brush").call(brush.move, null)
          }

          // Update axis and area position
          xAxisElement.transition().duration(1000).call(xAxis)
          var selection = areaHolder
              .selectAll('g.activity > path.area')

          selection
              .transition()
              .duration(1000)
              .attr("d", area)
              .on('end', () => {zoomTransitionRunning = false})
        }
       
        // If user double click, reinitialize the chart
        svg.on("dblclick",function(){
          zoomTransitionRunning = true
          xScale.domain(d3.extent(dataFlat, function(d) { return d.time; }))
          xAxisElement.transition().call(xAxis)
          areaHolder
            .selectAll('g.activity > path.area')
            .transition()
            .attr("d", area)
            .on('end', () => {zoomTransitionRunning = false} )
        });
    })
}
