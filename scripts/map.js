function ReturnPage() {
    // Add your redirection logic here
    window.location.href = "index.html";
}
    // Use a self-invoking function to avoid polluting the global namespace
(function() {
      require([
        "esri/WebMap",
        "esri/layers/FeatureLayer",
        "esri/views/MapView",
        "esri/widgets/Legend"
      ], (WebMap, FeatureLayer, MapView, Legend) => {

        const layerUrl = "https://services1.arcgis.com/4yjifSiIG17X0gW4/ArcGIS/rest/services/COVID_Trends_View/FeatureServer";

        // Create a Feature Layer with a title
        const covidLayer = new FeatureLayer({
          title: "Covid-19 cases",
          url: layerUrl,
          outFields: ["*"] // Specify the fields you want to display
        });

        // Define a blueish color scheme for the heatmap
        const colors = ["rgba(0, 0, 255, 0)", "#0033cc", "#0055cc", "#0077cc", "#0099cc", "#00bbcc", "#00ddee", "#00ffff", "#33ffcc", "#66ff99", "#99ff66", "#ccff33", "#ffff00"];

        // Configure renderer for the heatmap
        covidLayer.renderer = {
          type: "heatmap",
          colorStops: colors.map((color, index) => ({ color, ratio: index / (colors.length - 1) })),
          radius: 18,
          maxDensity: 0.04625,
          minDensity: 0
        };

        // Create a Web Map with the specified basemap and layer
        const webmap = new WebMap({
          basemap: { portalItem: { id: "466f3f43c231453c938c6776777b89e2" } },
          layers: [covidLayer]
        });

        // Create a MapView and set its properties
        const mapView = new MapView({
          container: "viewDiv",
          center: [-117.79621, 33.91474],
          scale: 1155581,
          constraints: {
            snapToZoom: false,
            minScale: 100000000,
            maxScale: 10000
          },
          map: webmap
        });

        // Add Legend widget to the top-right corner of the map view
        mapView.ui.add(new Legend({ view: mapView }), "top-right");
      });
})();