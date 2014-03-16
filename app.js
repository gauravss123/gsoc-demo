Ext.application({
    // require any components we are using in this example
    requires: [
        'Ext.data.Store',
	'Ext.MessageBox',
        'Ext.List',
        'Ext.field.Search',
        'Ext.Toolbar',
        'Ext.Panel',
	'Ext.Button',
	'Ext.Map'
    ],

    /**
     * The launch method is called when the browser is ready, and the application can launch.
     *
     * Inside our launch method we create the list and show in in the viewport. We get the lists configuration
     * using the getListConfiguration method which we defined below.
     *
     * If the user is not on a phone, we wrap the list inside a panel which is centered on the page.
     */
    launch: function() {
        //get the configuration of the list
         var listConfiguration = this.getListConfiguration();
	 var filterTool=this.getfilterTool();
	 var filterTool2=this.getfilterTool2();
	 var filterTool3=this.getfilterTool3();
	 var filterTool4=this.getfilterTool4();
	 var filterTool5=this.getfilterTool5();
	 var filterTool6=this.getfilterTool6();
	 
  //check if the device is a phone
        //if (!Ext.os.is.Phone) {
            //add a panel into the viewport
            Ext.Viewport.add(
	      
	      {
                //panel gets special styling when it is floating
                xtype: 'panel',

                //give it a fixed width and height
                width: (Ext.Viewport.getWidth()),
                height: (Ext.Viewport.getHeight()),
		
                //center the panel
                left: true,

                //modal gives it a mask
                modal: true,

                //disable the hide on mask tap functionality of modal
                hideOnMaskTap: false,

                //give it a fit layout so the list item stretches to the size of this panel
                layout: 'fit',

                //give it 1 item which is the listConfiguration
                items: [
                {
		
                    xtype: 'toolbar',
		    ui:'neutral',
                    docked: 'top',
		    layout: 'hbox',
		    flex: 1,

                    items: [
                        { xtype: 'spacer' },
                        {
                            xtype: 'searchfield',
                            placeHolder: 'Search...',
			     left: true,
			     width: 200,
                            listeners: {
                                scope: this,
                                clearicontap: this.onSearchClearIconTap,
                                keyup: this.onSearchKeyUp
                            }
                        },

			{
			 
			  xtype:'button',
			  text:'filter',
			  
			  left:200,
			   handler: function () {
			     Ext.getCmp('t1').setHidden(false);
			     Ext.getStore('docstore').clearFilter();
                    }
			  
			},
                        { xtype: 'spacer' },
			{
			  xtype:'button',
			  iconCls: 'arrow_left',
			  text: 'back'

			  
			},
			
			{
			 
			  xtype:'button',
			  iconCls: 'home',
			  text: 'home'
			  
			}
			
                    ]
                
		
	      },
	      {	xtype:'container',
		id: 'contain',
		left:200,
		 width:'auto',
		 height:'auto',
		 //hide
		items: [
	      {
		  //docked: 'top',
		   
		      xtype:'button',
		      width:'auto',
		      top:200,
		      text: 'Show on map',
		      hidden:true,
		      id:'but',
		      ui:'action'
		      
		      
		  },
				
		]
	      },
	      {
		xtype: 'container',
		id:'mapcontain',
		hidden:true,
		left:200,
		width:'auto',
		height:'auto',
		layout: 'card',
		items: [
		  { 
		    xtype: 'map',
		    id:'map',    
		  }
		  
		]
		
	      },

   		 listConfiguration,
		 filterTool,
		 filterTool2,
		 filterTool3,
		 filterTool4,
		 filterTool5,
		 filterTool6
		 
		]
            }).show();
    },

    /**
     * Returns the configuration of the list for this example, to be inserted into the viewport in the launch method.
     */
    getListConfiguration: function() {
        return {
            //give it an xtype of list
	xtype: 'list',

            ui: 'round',

            pinHeaders: false,

            //itemTpl defines the template for each item in the list
            itemTpl: '<div class="contact">{firstName} <strong>{lastName}</strong></div>',

            //give it a link to the store instance
            store: this.getStore(),
		listeners:{
		 itemtap: this.getTap
		},

            useSimpleItems: true,
	    width:200,
            grouped: true,
            emptyText: '<div style="margin-top: 20px; text-align: center">No Matching Items</div>',
            disableSelection: false,

        };
    },
    /**
     * Returns a new store instance if one hasn't been created yet
     * @return {Ext.data.Store}
     */
    getStore: function() {
        //check if a store has already been set
        if (!this.store) {
            //if not, create one
            this.store = Ext.create('Ext.data.Store', {
                //define the stores fields
              id:'docstore',  
	      fields: ['pharmacy','ambulance','gov','state','city','lat','long','firstName', 'lastName'],

                //sort the store using the lastname field
                sorters: 'firstName',

                //group the store using the lastName field
//                groupField: 'firstName',
		 grouper: {
		    groupFn: function(record) {
		    return record.get('firstName')[0];
		  }
		  },

                //and give it some data
                data: [
                    {pharmacy: 'n', ambulance: 'n', gov: 'y', state:'d', city:'g',lat: '28.66435', long:'77.16546', firstName: 'Tommy',   lastName: 'Maintz' },
                    {pharmacy: 'y', ambulance: 'n', gov: 'y', state:'d', city:'g',lat: '28.63214', long:'77.13265', firstName: 'Rob',     lastName: 'Dougan' },
                    {pharmacy: 'y', ambulance: 'n', gov: 'y', state:'d', city:'f',lat: '28.59568', long:'77.26545', firstName: 'Ed',      lastName: 'Avins' },
                    {pharmacy: 'n', ambulance: 'n', gov: 'y', state:'d', city:'f',lat: '28.60898', long:'77.23654', firstName: 'Jamie',   lastName: 'Avins' },
                    {pharmacy: 'n', ambulance: 'n', gov: 'y', state:'e', city:'f',lat: '28.65432', long:'77.13564', firstName: 'Dave',    lastName: 'Dougan' },
                    {pharmacy: 'n', ambulance: 'n', gov: 'y', state:'e', city:'f',lat: '28.67156', long:'77.19876', firstName: 'Abraham', lastName: 'Elias' },
                    {pharmacy: 'y', ambulance: 'y', gov: 'y', state:'e', city:'d',lat: '28.63546', long:'77.28165', firstName: 'Jacky',   lastName: 'Ngyuyen' },
                    {pharmacy: 'y', ambulance: 'y', gov: 'y', state:'e', city:'d',lat: '28.60654', long:'77.23156', firstName: 'Jay',   lastName: 'Ngyuyen' },
                    {pharmacy: 'y', ambulance: 'y', gov: 'n', state:'e', city:'d',lat: '28.65432', long:'77.11465', firstName: 'Jay',     lastName: 'Robinson' },
                    {pharmacy: 'y', ambulance: 'y', gov: 'n', state:'f', city:'d',lat: '28.59264', long:'77.32465', firstName: 'Rob',   lastName: 'Avins' },
                    {pharmacy: 'n', ambulance: 'y', gov: 'n', state:'f', city:'e',lat: '28.61659', long:'77.10926', firstName: 'Ed',     lastName: 'Dougan' },
                    {pharmacy: 'n', ambulance: 'y', gov: 'n', state:'f', city:'e',lat: '28.63259', long:'77.16876', firstName: 'Jamie',    lastName: 'Poulden' },
                    {pharmacy: 'y', ambulance: 'y', gov: 'n', state:'f', city:'e',lat: '28.66265', long:'77.19872', firstName: 'Dave',      lastName: 'Spencer' },
                    {pharmacy: 'y', ambulance: 'y', gov: 'n', state:'g', city:'c',lat: '28.64356', long:'77.16987', firstName: 'Abraham',   lastName: 'Avins' },
                    {pharmacy: 'y', ambulance: 'y', gov: 'n', state:'g', city:'c',lat: '28.65423', long:'77.17564',firstName: 'Jacky',   lastName: 'Avins' },
                    {pharmacy: 'n', ambulance: 'y', gov: 'n', state:'h', city:'b',lat: '28.65987', long:'77.26546',firstName: 'Rob',    lastName: 'Kaneda' },
                    {pharmacy: 'n', ambulance: 'n', gov: 'n', state:'h', city:'b',lat: '28.60598', long:'77.21035',firstName: 'Ed', lastName: 'Elias' },
                    {pharmacy: 'n', ambulance: 'n', gov: 'n', state:'h', city:'a',lat: '28.65432', long:'77.23246', firstName: 'Tommy',    lastName: 'Dougan' },
                    {pharmacy: 'n', ambulance: 'n', gov: 'n', state:'h', city:'a',lat: '28.65432', long:'77.10654', firstName: 'Rob',     lastName: 'Robinson' }
                ]
            });
        }

        //return the store instance
        return this.store;
    },

    /**
     * Called when the search field has a keyup event.
     *
     * This will filter the store based on the fields content.
     */
    onSearchKeyUp: function(field) {
        //get the store and the value of the field
        var value = field.getValue(),
            store = this.getStore();

        //first clear any current filters on the store. If there is a new value, then suppress the refresh event
        store.clearFilter(!!value);

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(','),
                regexps = [],
                i, regex;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                regex = searches[i].trim();
                regex = regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(regex.trim(), 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = search.test(record.get('firstName') + ' ' + record.get('lastName'));

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }

                return (regexps.length && matched.indexOf(true) !== -1);
            });
        }
    },

    /**
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     */
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        this.getStore().clearFilter();	
    },

  
    getTap: function(view, index, item, e) {
			var rec = view.getStore().getAt(index);
			 //Ext.Msg.alert('Tap', 'Disclose more info for ' + rec.get('firstName')+rec.get('lastName'));
			
			var body= 'Doctors name: Dr.'+ rec.get('firstName')+rec.get('lastName')+'<br>';
			var con=Ext.getCmp('contain');
			con.hide(true);
			var but=Ext.getCmp('but');
			console.log(but.getId)
			con.setHtml(body).show(true);
			but.setHidden(false);
			but.addListener({
			    tap:function(){
				  var lat=rec.get('lat');
				  var long=rec.get('long');
				  var title=rec.get('firstName');
				  console.log(lat+long);
				  position=new google.maps.LatLng(lat,long);
				  console.log(position);
				  var mappy=Ext.getCmp('map');
				  console.log(mappy.getId());
				  //mappy.setMapCenter(position);
				  mappy.setMapOptions({
				  	    center : new google.maps.LatLng(lat,long),
						      
					    zoom : 12,
					    mapTypeId : google.maps.MapTypeId.ROADMAP,
					    navigationControl: true,
					    navigationControlOptions: {
					    style: google.maps.NavigationControlStyle.DEFAULT}				    
				  });
				  console.log('after setMapOptions');
				  mappy.setListeners({	  
					  maprender: function(comp, map) {
					  var marker = new google.maps.Marker({
					  position: position,
					  title : title,
					  map: map	
					  });
					  console.log('inside map.setListeners');

					  google.maps.event.addListener(marker, 'click', function() {
					      infowindow.open(map, marker);
					      });
					  console.log('after google.maps.event.addListener');

					    setTimeout(function() {	
					    map.panTo(position);
					      }, 1000);
					    console.log('after setTimeout');
					}
				  });
				  console.log('after setListeners');
				  con.hide(true);
				  //mappy.create();
				  mappy.show(true);
				  Ext.getCmp('mapcontain').setHidden(false).show(true);  
				  
				  console.log('after mapcontain');
				  mappy.setHidden(false);
				  console.log('after mappyshow');
				
				  
			    }
			  
			  });
				  
			
	    
	    },


  getfilterTool: function(){
    
   return{
	  
	  xtype:'toolbar',
	  id:'t1',
	  ui:'neutral',
	  docked:'bottom',
	  hidden:true,
	  items:[
	    {text:'location',
	      handler: function()
	      {
		 
		  Ext.getCmp('t2').setHidden(false);
		  Ext.getCmp('t3').setHidden(true);
		  Ext.getCmp('t4').setHidden(true);
		  
			  
		
	      }
	    },
	    {text:'Services offered',
	      handler: function()
	      {
		 
		  Ext.getCmp('t3').setHidden(false);
		  Ext.getCmp('t2').setHidden(true);
		  Ext.getCmp('t4').setHidden(true);

		
	      }
	    },
	    {text:'Type',
	      handler: function()
	      {
		 
		  Ext.getCmp('t4').setHidden(false);
		  Ext.getCmp('t3').setHidden(true);
		  Ext.getCmp('t2').setHidden(true);
		  

		
	      }
	    },
	    {text:'Clear Filter',
	      
	      handler: function()
	      {
		 var sto = Ext.getStore('docstore').clearFilter();
		  Ext.getCmp('t4').setHidden(true);
		  Ext.getCmp('t3').setHidden(true);
		  Ext.getCmp('t2').setHidden(true);
		  Ext.getCmp('t5').setHidden(true);
		  Ext.getCmp('t6').setHidden(true);
		  Ext.getCmp('phar').setUi('action');
		  Ext.getCmp('amb').setUi('action');
		  Ext.getCmp('gov').setUi('action');
		  Ext.getCmp('state').setUi('action');
		  Ext.getCmp('city').setUi('action');
		  Ext.getCmp('ds').setUi('action');
		  Ext.getCmp('es').setUi('action');
		  Ext.getCmp('fs').setUi('action');
		  Ext.getCmp('gs').setUi('action');
		  Ext.getCmp('hs').setUi('action');
		  Ext.getCmp('a').setUi('action');
		  Ext.getCmp('b').setUi('action');
		  Ext.getCmp('c').setUi('action');
		  Ext.getCmp('d').setUi('action');
		  Ext.getCmp('e').setUi('action');
		  Ext.getCmp('f').setUi('action');
		  Ext.getCmp('g').setUi('action');
		  
		
	      }
	    },{xtype: 'spacer'},
	    { 
	      iconCls:'delete',
	      ui:'decline',
	      handler: function()
	      {
		  Ext.getCmp('t1').setHidden(true);
		  Ext.getCmp('t4').setHidden(true);
		  Ext.getCmp('t3').setHidden(true);
		  Ext.getCmp('t2').setHidden(true);

		
		 
	      }
	    }
	    
	  ]
	 
	
    };	 
  },
  getfilterTool2: function(){
    
   return{
	  hidden:true,
	  id:'t2',
	  ui:'neutral',
	  xtype:'toolbar',
	  docked:'bottom',
	  hidden:true,
	  items:[
	    {
	      xtype:'button',
	      id:'state',
	      ui:'action',
	      text:'State',
	      handler: function()
	      {
		Ext.getCmp('t5').setHidden(false); 
		
		
	      }
	    },
	    { 
	      xtype:'button',
	      id:'city',
	      ui:'action',
	      text:'city',
	      handler: function()
	      {
		Ext.getCmp('t6').setHidden(false); 
		
	      }
	    }
	    
	  ]
    };	 
  },
  getfilterTool3: function(){
    
   return{
	  hidden:true,
	  id:'t3',
	  ui:'neutral',
	  xtype:'toolbar',
	  docked:'bottom',
	  hidden:true,
	  items:[
	    {text:'Pharmacy',
	      xtype:'button',
	      id:'phar',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('pharmacy', 'y');
		this.setUi('normal');
		
		
	      }
	    },
	    {text:'Ambulance',
	      xtype:'button',
	      id:'amb',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('ambulance', 'y'); 
		this.setUi('normal');
	      }
	    }    
	  ]
	 
	
    };
  },   
  getfilterTool4: function(){
    
   return{
	  hidden:true,
	  id:'t4',
	  ui:'neutral',
	  xtype:'toolbar',
	  docked:'bottom',
	  hidden:true,
	  items:[
	    {text:'Government',
	      id:'gov',
	      ui:'action',
	      xtype:'button',
	      handler: function()
	      {
		  var sto = Ext.getStore('docstore');
                sto.filter('gov', 'y');  
		this.setUi('normal');
	      }
	    },
	    {  xtype:'button',
	      text:'Private',
	      id:'priv',  
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('gov', 'n');
		this.setUi('normal');
		
	      }
	    }
	    
	  ]
	 
	
    };
  },
  getfilterTool5: function(){
    
   return{
	  hidden:true,
	  id:'t5',
	  ui:'neutral',
	  xtype:'toolbar',
	  docked:'bottom',
	  hidden:true,
	  items:[
	    {text:'state 1',
	      xtype:'button',
	      id:'ds',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('state', 'd');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    }, 
	    {text:'state 2',
	      xtype:'button',
	      id:'es',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('state', 'e');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    },
	    {text:'state 3',
	      xtype:'button',
	      id:'fs',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('state', 'f');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    },
	    {text:'state 4',
	      xtype:'button',
	      id:'gs',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('state', 'g');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    },
	    {text:'state 5',
	      xtype:'button',
	      id:'hs',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('state', 'h');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    },
	  ]
	 
	
    };
  },
  getfilterTool6: function(){
    
   return{
	  hidden:true,
	  id:'t6',
	  ui:'neutral',
	  xtype:'toolbar',
	  docked:'bottom',
	  hidden:true,
	  items:[
	    {text:'city 1',
	      xtype:'button',
	      id:'a',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('city', 'a');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    },
	    {text:'city 2',
	      xtype:'button',
	      id:'b',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('city', 'b');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    },
	    {text:'city 3',
	      xtype:'button',
	      id:'c',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('city', 'c');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    },
	    {text:'city 4',
	      xtype:'button',
	      id:'d',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('city', 'd');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    },{text:'city 5',
	      xtype:'button',
	      id:'e',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('city', 'e');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    },{text:'city 6',
	      xtype:'button',
	      id:'f',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('city', 'f');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    },{text:'city 7',
	      xtype:'button',
	      id:'g',
	      ui:'action',
	      handler: function()
	      {
		var sto = Ext.getStore('docstore');
                sto.filter('city', 'g');
		this.setUi('normal');
		Ext.getCmp('state').setUi('normal');
	      }
	    },
    
	  ]
	 
	
    };
  }
    
  

});
  
