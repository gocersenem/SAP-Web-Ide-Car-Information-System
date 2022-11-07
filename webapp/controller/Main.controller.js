sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

], function(Controller, Filter, FilterOperator) {
	"use strict";
	var oModel;
	var arac = [];

	return Controller.extend("Arac.arac.controller.Main", {

			onInit: function() {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute("Main").attachPatternMatched(function(oEvent) {
					this.setInputs(oEvent);
				}, this);
				arac = [];
				oModel = this.getOwnerComponent().getModel("MainModel");
				var vizModel = this.getOwnerComponent().getModel("Model");
				vizModel.setData({
					"Cars": [{
						"Brand": "Audi",
						"Value": "20000000"
					}, {
						"Brand": "BMW",
						"Value": "10000000"
					}, {
						"Brand": "Mercedes",
						"Value": "100000000"
					}, {
						"Brand": "Walkswagen",
						"Value": "40000000"
					}]
				});

				var ovizFrame = this.byId("idVizFrame");
				ovizFrame.setModel(vizModel);

				var odataset = new sap.viz.ui5.data.FlattenedDataset({
					dimensions: [{
						name: 'Brands',
						value: '{Model>Brand}'
					}],
					measures: [{
						name: 'Cars Bought',
						value: '{Model>Value}'
					}],
					data: {
						path: 'Model>/Cars'
					}

				});

				ovizFrame.setDataset(odataset);

				ovizFrame.setVizProperties({
					ploatArea: {
						colorpalette: d3.scale.category20().range(),
						dataLabel: {
							visible: true
						}
					},
					title: {
						visible: "true",
						text: "Chart"
					}
				});
				var fva = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "valueAxis",
					'type': "Measure",
					'values': ["Cars Bought"]
				});
				var fca = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "categoryAxis",
					'type': "Dimension",
					'values': ["Brands"]
				});
				ovizFrame.addFeed(fca);
				ovizFrame.addFeed(fva);

				var oPopOver = this.getView().byId("idPopOver");
				oPopOver.connect(ovizFrame.getVizUid());

				oModel.setProperty("/count", "0");

				arac.push({
					tutar: "260.000.00",
					pakettip: "",
					expertizid: "0000" + Math.floor(Math.random() * 10000),
					yonnot: "",
					dannot: "",
					plaka: "31MR123",
					sasi: "web308997089",
					tarih: "",
					sube: "",
					danisman: "",
					aractur: "",
					marka: "OPEL",
					model: "Granland 1.2",
					modelyili: "2020",
					paket: "ENJOY",
					km: "328",
					tramer: "",
					expertiztarih: "",
					expertizsaat: "",
					acik: "Comparing itemesponsive. It is only available for desktops and tablets, so you will need to take an adaptive approach by offering an additional UI for smartphones.",
					sunroof: "false",
					yedek: "true",
					onay: false
				});
				arac.push({
					tutar: "660.000.00",
					expertizid: "0000" + Math.floor(Math.random() * 10000),
					yonnot: "",
					dannot: "",
					pakettip: "",
					plaka: "33MN123",
					sasi: "web338997229",
					tarih: "dsfs",
					sube: "",
					danisman: "",
					aractur: "",
					marka: "Walkswagen",
					model: "Passat",
					modelyili: "2011",
					paket: "",
					km: "100",
					tramer: "0",
					expertiztarih: "",
					expertizsaat: "",
					acik: "",
					sunroof: "true",
					yedek: "true",
					onay: false
				});
				oModel.setProperty("/arac", arac);

			},

			onColSelected: function(oEvent) {
				var vizframe = this.byId("idVizFrame");
				vizframe.setVizType("column");
			},
			onPieSelected: function(oEvent) {
				var vizframe = this.byId("idVizFrame");
				vizframe.setVizType("pie");
			},
			onSearch: function(oEvent) {

				var aFilters = [];
				var sQuery = oEvent.getSource().getValue();
				var filter = new Filter("plaka", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
				var oList = this.byId("ShortProductList");
				var oBinding = oList.getBinding("items");
				oBinding.filter(aFilters);

			},
			accept: function() {
				var d = oModel.getProperty("/count");
				var y = parseInt(d) + 1;
				oModel.setProperty("/count", y);

			},

			selected: function(oEvent) {

				var value = oEvent.getSource()._aSelectedPaths[0];
				var index = value.slice("6");
				var arr = oModel.getProperty("/arac")[index];
		
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("routesample", {
					arac: arr.sasi
				}, true);
			

			},
			setInputs: function(oEvent) {
				var sasi = oEvent.getParameter("arguments").arac;
				
				var dizi = oModel.getProperty("/arac");
				var arr = dizi.find(function(s) {
					return s.sasi === sasi;
				});
			oModel.setProperty("/entry", arr);
					oModel.setProperty("/part", arr);
			
		},

		onSideNavButtonPress: function() {
			var oToolPage = this.byId("toolPage");
			var bSideExpanded = oToolPage.getSideExpanded();

			this._setToggleButtonTooltip(bSideExpanded);

			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function(bLarge) {
			var oToggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				oToggleButton.setTooltip('Large Size Navigation');
			} else {
				oToggleButton.setTooltip('Small Size Navigation');
			}
		}

	});

});