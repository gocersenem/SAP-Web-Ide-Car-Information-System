sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/core/routing/Route"
], function(Controller, Route) {
	"use strict";

	return Controller.extend("Arac.arac.controller.routesample", {

		onInit: function() {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("Main").attachPatternMatched(function(oEvent) {
			this.setInputs(oEvent);
			}, this);
		},
		setInputs: function(oEvent) {
				var product = oEvent.getParameter("arguments").arac;
				this.byId("b1").setText(product);
			
			}
		
	});

});