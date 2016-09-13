/**
 * New node file
 */
module.exports = 
{
	ZSSetLync: {
		bool: { 
			must: [
				{ match: { uid:   "zhoushuo"        }}, 
        		{ match: { url: "\/app_set_lync_type" }}  
			],
			filter: [ 
//        		{ term:  { method: "POST" }}, 
				{ range: { dt: { "gte": "2016-07-08" }}} 
			]
		}		
	},
	
	//query:filterQ
    filterQ: { 
		bool: { 
			must: [
				{ match: { uid:   "liuha1"        }}, 
//        		{ match: { url: "\/app_login" }}  
			],
			filter: [ 
//        		{ term:  { method: "POST" }}, 
				{ range: { dt: { "gte": "2016-07-07" }}} 
			]
		}
   },
	//query:queryQ
   queryQ: {
		match: {
		  uid: 'liuha1'
		}
	},
	//query:queryAll
	queryAll: { match_all: { boost : 1.2 }},
	//body:AggsQ
	AggsQ: {
		size:0,
		aggs : {
			urlCount : {
				cardinality : {
					field : "uid"
				}
			}
		}
	},
	//body:AggsBody
	AggsBody: {
		size:0,
		query : {
				range : {
					"dt" : {
						from : "2016-07-01T00:00:00",
						to : "2016-08-08T00:30:00"
					}
				}
		},
		aggs: {
			ActiveUsers: {
				terms: {
					field: "uid",
					size:100000
				}
			}
		}
	},
	
	//body:AggsBody
	AggsBodyDevice: {
		size:0,
		query : {
				range : {
					"dt" : {
						from : "2016-07-01T00:00:00",
						to : "2016-08-08T00:30:00"
					}
				}
		},
		aggs: {
			ActiveUsers: {
				cardinality: {
					field: "vjson.imei",
//					size:100000
				}
			}
		}
	},

	//body:月活数字
	MonthActiveCountBody: {
		size:0,
		query : {
				range : {
					"dt" : {
						from : "2016-07-31T16:00:00",
						to : "2016-08-31T16:00:00"
					}
				}
		},
		aggs: {
			ActiveUsers: {
				cardinality: {
					field: "uid",
				}
			}
		}
	},
			//body:月活数字
	MonthActiveListBody: {
		size:0,
		query : {
				range : {
					"dt" : {
						from : "2016-06-30T16:00:00",
						to : "2016-07-31T16:00:00"
					}
				}
		},
		aggs: {
			ActiveUsers: {
				terms: {
					field: "uid",
					size:10000
				}
			}
		}
	},
			//body:月活AD数字
	MonthActiveADCountBody: {
		size:0,
		query : {
				range : {
					"dt" : {
						from : "2016-07-31T16:00:00",
						to : "2016-08-31T16:00:00"
					}
				}
		},
		aggs:{
			LenovoUsers:{
				filter : { "term": { "ad_type": "ad" } },
				aggs: {
					ActiveUsers: {
						cardinality: {
							field: "uid",
						}
					}
				}
			}
		}
	},
				//body:AD用户每月月活
	MultipleMonthBody :{
		size:0,
		query : {
				range : {
					"dt" : {
						from : "2015-07-31T16:00:00",
						to : "2016-07-31T16:00:00"
					}
				}
		},
		aggs: {
			record_over_time: {
				date_histogram: {
					field: "dt",
					interval : "month",
					time_zone: "+08:00",
					format:"YYYYMM"
				},
				aggs: {
					ActiveUsers: {
						cardinality: {
							field: "uid"
						}
						
					}
				}
			}
		}


	},
	
	//每月Device数 by imei
	MultipleMonthDeviceBody :{
		size:0,
		query : {
				range : {
					"dt" : {
						from : "2015-07-31T16:00:00",
						to : "now/d"
					}
				}
		},
		aggs: {
			//*
			record_over_time: {
				date_histogram: {
					field: "dt",
					interval : "month",
					time_zone: "+08:00",
					format:"YYYYMM"
				},

				aggs: {
					ActiveUsers: {
						cardinality: {
							field: "vjson.miei" //iOS
//							field:"vjson.imei"  //android
						}
						
					}
				}
			}
		}


	},
	
	//每月Device数 by uid 因为老版本(<=3.10.5)不传IMEI
	MultipleMonthDeviceBody2 :{
		size:0,
		query : {
			filtered:{
				filter:{
					and:[
							{range : {
								"dt" : {
									from : "2015-07-31T16:00:00",
									to : "now/d"
								}
							}
							},
							{range : {
								"vjson._v":{
									lte: "3.10.5"
								}
							}
							}
					    ]
				
			   }
			}

		},
		aggs: {
			//*
			record_over_time: {
				date_histogram: {
					field: "dt",
					interval : "month",
					time_zone: "+08:00",
					format:"YYYYMM"
				},

				aggs: {
					ActiveUsers: {
						cardinality: {
							field: "uid"
						}
						
					}
				}
			}
		}


	},
	//每月Device数 by uid 因为老版本(<=3.10.5)不传IMEI
	MultipleMonthDeviceBodyPC :{
		size:0,
		query : {
			filtered:{
				filter:{
					and:[
							{range : {
								"dt" : {
									from : "2015-07-31T16:00:00",
									to : "now/d"
								}
							}
							},
							{range : {
								"vjson._pc":{
									gt: " "
								}
							}
							}
					    ]
				
			   }
			}

		},
		aggs: {
			//*
			record_over_time: {
				date_histogram: {
					field: "dt",
					interval : "month",
					time_zone: "+08:00",
					format:"YYYYMM"
				},

				aggs: {
					ActiveUsers: {
						cardinality: {
							field: "uid"
						}
						
					}
				}
			}
		}


	},
			//body:AD用户每月月活
	MultipleMonthLenovoBody :{
		size:0,
		query : {
				range : {
					"dt" : {
						from : "2015-07-31T16:00:00",
						to : "2016-07-31T16:00:00"
					}
				}
		},
		aggs : {
			LenovoUsers:{
            filter : { "term": { "ad_type": "ad" } },
				aggs: {
					record_over_time: {
						date_histogram: {
							field: "dt",
							interval : "month",
							time_zone: "+08:00",
							format:"YYYYMM"
						},
						aggs: {
							ActiveUsers: {
								cardinality: {
									field: "uid"
								}
								
							}
						}
					}

				}
			}
		}
	},
	
	//body:AggsDauBody
	AggsDauBody: {
		size:0,
		query : {
				range : {
					"dt" : {
						from : "2016-07-07T00:00:00",
						to : "2016-07-01T00:30:00"
					}
				}
		},
		aggs: {
			ActiveUsers: {
				value_count: {
					field: "uid",
					size:100000
				}
			}

		}
	},
	//body:每日日活
	FacetsBody :{
		size:0,
		query : {
				range : {
					"dt" : {
						from : "2016-06-30T16:00:00",
						to : "2016-08-31T16:00:00"
					}
				}
		},
		aggs: {
			record_over_time: {
				date_histogram: {
					field: "dt",
					interval : "day",
					time_zone: "+08:00",
					format:"YYYYMMdd"
				},
				aggs: {
					ActiveUsers: {
						cardinality: {
							field: "uid"
						}
						
					}
				}
			}

		}
	},
	
		//body:AD用户每日日活
	FacetsLenovoBody :{
		size:0,
		query : {
				range : {
					"dt" : {
						from : "2016-07-31T16:00:00",
						to : "2016-08-31T16:00:00"
					}
				}
		},
		aggs : {
			LenovoUsers:{
            filter : { "term": { "ad_type": "ad" } },
				aggs: {
					record_over_time: {
						date_histogram: {
							field: "dt",
							interval : "day",
							time_zone: "+08:00",
							format:"YYYYMMdd"
						},
						aggs: {
							ActiveUsers: {
								cardinality: {
									field: "uid"
								}
								
							}
						}
					}

				}
			}
		}
	},
	
	
	
	//body:DateRangeBody
	DateRangeBody :
	{

		size:0,
	   query:{

		  range:{"dt":{gte:"2016-07-17T16:00:00"}}

	   },

	   aggs: {

		 sale: {

		   date_histogram: {

			 field: "dt",

			 interval: "hour", 

			 format: "ddHH" 

			 }

		  }

	   }

	},
	
		//body:FacetsBody
	FilterBody :{
		size:0,
		query : {
				range : {
					"dt" : {
						from : "now-14d/d",
						to : "now/d"
					}
				}
		},
		aggs: {
			record_over_time: {
				date_histogram: {
					field: "dt",
					interval : "day",
					format:"YYYYMMdd"
				},
				aggs: {
					ActiveUsers: {
						cardinality: {
							field: "uid",
						}
						
					}
				}
			}

		}
	},
	
	//RegExp OK
	RegExpBody :{
		size:0,
		query:{
			regexp:{"uid": "(hy|xm|wh).*"}
        },
		aggs: {
			record_over_time: {
				date_histogram: {
					field: "dt",
					interval : "day",
					time_zone: "+08:00",
					format:"YYYYMMdd"
					

				},
				aggs: {
					ActiveUsers: {
						cardinality: {
							field: "uid",
						}
						
					}
				}
			}

		}
	},
	//Filter OK
	FilterBody2 :{
        size:0,
        query : {
                match_phrase_prefix: {
					"uid": {query: "liu"}
				}

		},
       aggs:{
          LenovoUsers:{
            filter : { "term": { "ad_type": "ad" } },
            aggs:{
              ActiveUsers: {
                cardinality: {
                   field: "uid"
                   }	
                }
             }
          }
        }
	},
	//Multiple Fields
	MultipleFieldsBody:{
		size:0,
		query : {
				range : {
					"dt" : {
						from : "now-10d/d",
						to : "now/d"
					}
				}
		},
		aggs: {
			record_over_time: {
				date_histogram: {
					field: "dt",
					interval : "day",
					time_zone: "+08:00",
					format:"YYYYMMdd"
					

				},
				aggs: {
					ADTypes: {
						terms: {
							field: "ad_type",
							size: 0
						},
						aggs: {
							DAUs: {
								cardinality: {
									field: "uid",
								}
							}
						}
					}
				}
			}
		}
	},
			//body:URL
	URLBody :{
		size:0,
		query : {
				range : {
					"dt" : {
						from : "now-10d/d",
						to : "now/d"
					}
				}
		},
		aggs: {
			record_over_time: {
				date_histogram: {
					field: "dt",
					interval : "day",
					format:"YYYYMMdd"
				},
				aggs: {
					ActiveUsers: {
						terms: {
							field: "url",
						}
						
					}
				}
			}

		}
	},
	//Daily应用点击次数
	AppDailyClickBody :{
		size:0,
		query:{
			regexp:{"url": "browse_log_.*"}
        },
		aggs: {
			record_over_time: {
				date_histogram: {
					field: "dt",
					interval : "day",
					time_zone: "+08:00",
					format:"YYYYMMdd"
					

				},
				aggs: {
					AppClicks: {
						terms: {
							field: "url",
						}
						
					}
				}
			}

		}
	},
		//应用点击次数 OK
	AppClickBody :{
		size:0,
		query:{
			regexp:{"url": "browse_log_.*"}
        },
		aggs: {
			AppClicks: {
				terms: {
					field: "url",
				}
				
			}
		}
			

		
	},
	//接口点击次数 OK
	AllAPIMontylyLogBody :{
		size:0,
		query:{
			range : {
				"dt" : {
					from : "now-30d/d",
					to : "now/d"
				}
			}
        },
		aggs: {
			ApiClicks: {
				terms: {
					field: "url",
					size: 2000
				}				
			}
		}
		
	},


	//接口每周点击次数 OK
	AllAPIWeeklyLogBody :{
		size:0,
		query:{
			range : {
				"dt" : {
					from : "now-7d/d",
					to : "now/d"
				}
			}
        },
		aggs: {
			ApiClicks: {
				terms: {
					field: "url",
					size: 2000
				}				
			}
		}
		
	},	
		//Monthly应用点击次数
	AppMonthlyClickBody :{
		size:0,
		query : {
				range : {
					"dt" : {
						from : "now-30d/d",
						to : "now/d"
					}
				}
		},
		aggs: {
			record_over_time: {
				filter:{regexp:{"url": "browse_log_.*"}},
				aggs: {
					AppClicks: {
						terms: {
							field: "url"
						}
						
					}
				}

			}

		}
	}


}