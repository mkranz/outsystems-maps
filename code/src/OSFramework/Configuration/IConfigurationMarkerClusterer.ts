// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.Configuration {
    /**
     * Used to translate configurations from OS to Provider
     * Defines the basic structure for Map objects
     */
    export interface IConfigurationMarkerClusterer extends IConfiguration {
        clusterClass: string;
        markerClustererActive: boolean;
        markerClustererMaxZoom: number;
        markerClustererMinClusterSize: number;
        markerClustererZoomOnClick: boolean;
        styles: Array<OSStructures.Clusterer.Style>;
    }
}
