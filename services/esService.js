/**
 * New node file
 */
var filterLib=require("./filter.js");
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '10.122.11.40:9200',
//  log: 'trace'
});

var reqViewMap={
	'dau':{
		esQueryObj:{
				  //index: 'app_log_prod',
				  index: 'app_log_prod_with_user',
				  type: 'logs',
				  body: filterLib.FilterBody //DAU work
				},
		  rsView:"dau",
		  desc:"DAU (Last 60 days)"
	},
	'dau_ad':{
		esQueryObj:{
				  //index: 'app_log_prod',
				  index: 'app_log_prod_with_user',
				  type: 'logs',
				  body: filterLib.FilterBodyAD //DAU work
				},
		  rsView:"dau",
		  desc:"DAU AD(Last 60 days)"
	},
	'pcdevice':{
		esQueryObj:{
				  //index: 'app_log_prod',
				  index: 'app_log_prod_with_user',
				  type: 'logs',
				  body: filterLib.MultipleMonthDeviceBodyPC //
				},
		  rsView:"montlyDevice",
		  desc:"Monthly Active Devices (PC)"
	},
	'apiweekly':{
		esQueryObj:{
			  //index: 'app_log_prod',
			  index: 'app_log_prod_with_user',
			  type: 'logs',
			  body: filterLib.AllAPIWeeklyLogBody //
			},
	  rsView:"weeklyApiClick",
	  desc:"Weekly API Clicks"		
	},
	'wau':{
		esQueryObj:{
				  //index: 'app_log_prod',
				  index: 'app_log_prod_with_user',
				  type: 'logs',
				  body: filterLib.wFilterBody //DAU work
				},
		  rsView:"dau",
		  desc:"WAU (Last 60 days)"
	},
	'wau_ad':{
		esQueryObj:{
				  //index: 'app_log_prod',
				  index: 'app_log_prod_with_user',
				  type: 'logs',
				  body: filterLib.wFilterBodyAD //DAU work
				},
		  rsView:"dau",
		  desc:"WAU AD(Last 60 days)"
	}
}

module.exports = {
		  testES: function(req, res, next) {
			  //console.log(req.query.q);
			  var bCondition=(req.query.q=="dau");
			  console.log(bCondition);
			  var result={msg:"ok"};
			  var rsView='blankPage';
			  var desc="";
			  console.log(req.query.q);
			  if(typeof reqViewMap[req.query.q]!='undefined'){
//				  var esQueryObj={
//						  //index: 'app_log_prod',
//						  index: 'app_log_prod_with_user',
//						  type: 'logs',
//						  body: filterLib.FilterBody //DAU work
//						};
//				  rsView="dau";
//				  desc="DAU (Last 60 days)";
				  var esQueryObj=reqViewMap[req.query.q].esQueryObj;
				  rsView=reqViewMap[req.query.q].rsView;
				  desc=reqViewMap[req.query.q].desc;
				  
//			  }else if(req.query.q=="dau_ad"){
//				  var esQueryObj={
//						  //index: 'app_log_prod',
//						  index: 'app_log_prod_with_user',
//						  type: 'logs',
//						  body: filterLib.FilterBodyAD //DAU work
//						};
//				  rsView="dau";
//				  desc="DAU AD(Last 60 days)";
//			  }else if(req.query.q=='pcdevice'){
//				  var esQueryObj={
//						  //index: 'app_log_prod',
//						  index: 'app_log_prod_with_user',
//						  type: 'logs',
//						  body: filterLib.MultipleMonthDeviceBodyPC //
//						};
//				  rsView="montlyDevice";
//				  desc="Monthly Active Devices (PC)";
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
					res.render(rsView, { resultString: resp, descString: desc });
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

