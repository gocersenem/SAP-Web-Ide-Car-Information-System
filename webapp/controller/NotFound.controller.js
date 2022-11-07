sap.ui.define([
		"Arac/arac/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("Arac.arac.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);