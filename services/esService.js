/**
 * New node file
 */
var filterLib=require("./filter.js");
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '10.122.11.40:9200',
//  log: 'trace'
});

module.exports = {
		  testES: function(req, res, next) {
			  //console.log(req.query.q);
			  var bCondition=(req.query.q=="dau");
			  console.log(bCondition);
			  var result={msg:"ok"};
			  var rsView='blankPage';
			  if(req.query.q=="dau"){
				  var esQueryObj={
						  //index: 'app_log_prod',
						  index: 'app_log_prod_with_user',
						  type: 'logs',
						  body: filterLib.FilterBody //DAU work
						};
			  }else if(req.query.q=='devices'){
				  var esQueryObj={
						  //index: 'app_log_prod',
						  index: 'app_log_prod_with_user',
						  type: 'logs',
						  body: filterLib.MultipleMonthDeviceBodyPC //
						};
				  rsView="montlyDevice";				  
			  }else{
				  //res.send("Common Response");
				  res.render(rsView, { resultString: 'Common Response' });
				  return;
			  }
			  client.search(esQueryObj).then(function (resp) {
				    var hits = resp.hits.hits;
					/*ApiClicks
					for(i=0;i<resp.aggregations.ApiClicks.buckets.length;i++){
					  console.log(resp.aggregations.ApiClicks.buckets[i].key+"\t"+resp.aggregations.ApiClicks.buckets[i].doc_count);
					} //*/
					/* User list
					for(var i=0;i<resp.aggregations.ActiveUsers.buckets.length;i++){
					  console.log(resp.aggregations.ActiveUsers.buckets[i].key);
					} // */
//					console.trace(resp);
					//res.send(JSON.stringify(resp));
					//res.render(rsView, { resultString: JSON.stringify(resp) });
					res.render(rsView, { resultString: resp });
				}, function (err) {
				    console.trace(err.message);
				    return "error";
				    result={msg:'ng'};
				    res.send(JSON.stringify(result));
				});
		  },
		       
		  sayHelloInSpanish: function() {
		    return "Hola";
		  }
		};

